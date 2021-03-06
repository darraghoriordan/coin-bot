import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCustomBotDto } from "./dto/create-custom-bot.dto";
import { RunningStateEnum } from "./dto/runningStateEnum";
import { UpdateCustomBotDto } from "./dto/update-custom-bot.dto";
import { CustomBot } from "./entities/custom-bot.entity";

@Injectable()
export class CustomBotService {
    constructor(
        @InjectRepository(CustomBot)
        private repository: Repository<CustomBot>,
        private logger: CoreLoggerService
    ) {}

    async create(
        createCustomBotDto: CreateCustomBotDto,
        ownerId: string
    ): Promise<CustomBot> {
        this.logger.log("creating", createCustomBotDto);
        const model = this.repository.create({
            ownerId,
            name: createCustomBotDto.name,
            runEveryInSeconds: createCustomBotDto.runEveryInSeconds,
            runningState: createCustomBotDto.runningState,
        });

        return this.repository.save(model);
    }

    async findAll(ownerId: string): Promise<CustomBot[]> {
        return this.repository.find({
            order: { createdDate: "DESC" },
            where: {
                ownerId,
            },
            relations: ["triggers", "triggers.triggerResults"],
        });
    }

    async findOne(uuid: string, ownerId: string): Promise<CustomBot> {
        try {
            const queryBuilder = this.repository
                .createQueryBuilder("bot")
                .leftJoinAndSelect("bot.triggers", "trigger")
                .leftJoinAndSelect(
                    "trigger.triggerResults",
                    "triggerResult",
                    `"triggerResult"."createdDate" >= NOW() - INTERVAL '2 HOURS'`
                )
                .where("bot.ownerId = :ownerId", { ownerId })
                .andWhere("bot.uuid = :uuid", { uuid });

            const result: CustomBot = await queryBuilder.getOneOrFail();
            return result;
        } catch (error) {
            this.logger.error(error);
            throw new NotFoundException();
        }
    }

    /**
     * This is serial and horrible on purpose to just get something working.
     * This should all be shifted off to some async handler
     * @returns
     */
    async getAllBotsToRun(): Promise<CustomBot[]> {
        // get all active bots
        const allActiveBots = await this.repository.find({
            withDeleted: false,
            where: { runningState: RunningStateEnum.RUNNING },
            relations: ["triggers"],
        });
        return this.filterBotsToRun(allActiveBots, Date.now());
    }

    filterBotsToRun(bots: CustomBot[], nowDate: number): CustomBot[] {
        return bots.filter((x) => {
            const nowInSeconds = nowDate / 1000;

            const lastRunInSeconds = x.lastRun.getTime() / 1000;
            const nextRunInSeconds = lastRunInSeconds + x.runEveryInSeconds;

            return (
                nowInSeconds >= nextRunInSeconds &&
                x.triggers &&
                x.triggers.length > 0
            );
        });
    }
    /**
     * To be used when automatically triggering
     * @param bot
     * @returns
     */
    async updateLastRun(bot: CustomBot): Promise<CustomBot> {
        bot.lastRun = new Date();
        return this.repository.save(bot);
    }

    async update(
        uuid: string,
        updateCustomBotDto: UpdateCustomBotDto,
        ownerId: string
    ): Promise<CustomBot> {
        const customBot = await this.repository.findOne({
            order: { createdDate: "DESC" },
            where: {
                uuid,
                ownerId,
            },
            relations: ["triggers"],
        });

        if (!customBot) {
            throw new NotFoundException();
        }
        customBot.name = updateCustomBotDto.name;
        customBot.runEveryInSeconds = updateCustomBotDto.runEveryInSeconds;
        customBot.runningState = updateCustomBotDto.runningState;

        return this.repository.save(customBot);
    }

    async remove(uuid: string, ownerId: string): Promise<CustomBot[]> {
        const foundEntity = await this.repository.findOne({
            order: { createdDate: "DESC" },
            where: {
                uuid,
                ownerId,
            },
        });

        if (!foundEntity) {
            throw new NotFoundException();
        }

        return this.repository.remove([foundEntity]);
    }
}
