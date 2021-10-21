import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trigger } from "../trigger/entities/trigger.entity";
import { TriggerTypeEnum } from "../trigger/trigger-types/TriggerTypeEnum";
import { CreateCustomBotDto } from "./dto/create-custom-bot.dto";
import { UpdateCustomBotDto } from "./dto/update-custom-bot.dto";
import { CustomBot } from "./entities/custom-bot.entity";

@Injectable()
export class CustomBotService {
    constructor(
        @InjectRepository(CustomBot)
        private repository: Repository<CustomBot>,
        @InjectRepository(CustomBot)
        private triggerRepository: Repository<Trigger>,
        private logger: CoreLoggerService
    ) {}

    async create(
        createCustomBotDto: CreateCustomBotDto,
        ownerId: string
    ): Promise<CustomBot> {
        this.logger.log("creating", createCustomBotDto);
        const model = this.repository.create({ ownerId });
        const triggers = createCustomBotDto.triggers.map((x) => {
            const trigger = this.triggerRepository.create();
            trigger.triggerType = x.triggerType;
            switch (x.triggerType) {
                case TriggerTypeEnum.NO_ACTION_DEFAULT:
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    trigger.meta = x.allMeta.noActionTestMeta!;
                    break;
                case TriggerTypeEnum.TWITTER_USER_MENTION:
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    trigger.meta = x.allMeta.twitterUserMentionMeta!;
                    break;
            }

            trigger.updateSchedule = x.updateSchedule;
            return trigger;
        });
        model.triggers = triggers;

        return this.repository.save(model);
    }

    async findAll(ownerId: string): Promise<CustomBot[]> {
        return this.repository.find({
            order: { createdDate: "DESC" },
            where: {
                ownerId,
            },
        });
    }

    async findOne(uuid: string, ownerId: string): Promise<CustomBot> {
        return this.repository.findOneOrFail({
            order: { createdDate: "DESC" },
            where: {
                uuid,
                ownerId,
            },
        });
    }

    async trigger(uuid: string, ownerId: string): Promise<void> {
        // get the thing
        // for each trigger
        // map to trigger method
        // run synchronously
        // save results
        // at some stage in the future kick off the actions (queue anyone?)
        // return all results = true
        return Promise.resolve();
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
        });

        if (!customBot) {
            throw new NotFoundException();
        }

        customBot.checkSchedule = updateCustomBotDto.checkSchedule;

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
