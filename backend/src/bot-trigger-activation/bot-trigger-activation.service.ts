import { CoreLoggerService, EmailClient } from "@darraghor/nest-backend-libs";
import { Person } from "@darraghor/nest-backend-libs/dist/person/entities/person.entity";
import { PersonService } from "@darraghor/nest-backend-libs/dist/person/person.service";
import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CustomBotService } from "../custom-bot/custom-bot.service";
import { CustomBot } from "../custom-bot/entities/custom-bot.entity";
import { CreateTriggerResultDto } from "../trigger-result/dto/create-trigger-result.dto";
import { TriggerResultService } from "../trigger-result/trigger-result.service";
import { TriggerChecker } from "../trigger/trigger-types/TriggerChecker";

@Injectable()
export class BotTriggerActivationService {
    constructor(
        private readonly customBotService: CustomBotService,
        @Inject("TriggerCheckers")
        private readonly triggerCheckers: TriggerChecker[],
        private readonly triggerResultService: TriggerResultService,
        private readonly logger: CoreLoggerService,
        private readonly emailService: EmailClient,
        private readonly personService: PersonService
    ) {}

    async trigger(uuid: string, ownerId: string): Promise<void> {
        const botToRun = await this.customBotService.findOne(uuid, ownerId);

        return this.triggerOne(botToRun);
    }

    /**
     * This is serial and horrible on purpose to just get something working.
     * This should all be shifted off to some async handler
     * @returns
     */
    @Cron(CronExpression.EVERY_5_MINUTES)
    async triggerAll(): Promise<void> {
        const botsToRun = await this.customBotService.getAllBotsToRun();

        for (const bot of botsToRun) {
            await this.triggerOne(bot);
        }

        return Promise.resolve();
    }

    async triggerOne(bot: CustomBot): Promise<void> {
        const allTriggerResults = [];
        await this.customBotService.updateLastRun(bot);
        for (const t of bot.triggers) {
            try {
                const triggerCheckMethod = this.triggerCheckers.find((x) =>
                    x.shouldHandle(t)
                );
                if (!triggerCheckMethod) {
                    this.logger.error("Couldnt find handler for trigger", t);
                    throw new Error("Couldn't run trigger");
                }
                const shouldRunAction = await triggerCheckMethod.check(t);
                const triggerResult = new CreateTriggerResultDto();
                triggerResult.result = shouldRunAction;
                triggerResult.triggerId = t.id;

                const savedTriggerResult =
                    await this.triggerResultService.create(triggerResult);
                allTriggerResults.push(savedTriggerResult.result);
            } catch (error) {
                this.logger.error("Running trigger failed with exception", {
                    trigger: t,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    error,
                });
            }
        }
        if (allTriggerResults.every((x) => x === true)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            const p: Person = await this.personService.findOneByUuid(
                bot.ownerId
            );
            await this.emailService.sendMail(
                [p.email],
                [],
                `Bot Triggered - ${bot.name}`,
                `This bot was triggered at ${new Date().toUTCString()}`,
                "TriggerActivation"
            );
        }
    }
}
