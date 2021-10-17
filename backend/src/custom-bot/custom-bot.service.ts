import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trigger } from "../trigger/entities/trigger.entity";
import { CreateCustomBotDto } from "./dto/create-custom-bot.dto";
import { UpdateCustomBotDto } from "./dto/update-custom-bot.dto";
import { CustomBot } from "./entities/custom-bot.entity";

@Injectable()
export class CustomBotService {
    constructor(
        @InjectRepository(CustomBot)
        private repository: Repository<CustomBot>
    ) {}

    async create(createCustomBotDto: CreateCustomBotDto): Promise<CustomBot> {
        const model = this.repository.create();
        const triggers = createCustomBotDto.triggers.map((x) => {
            const trigger = new Trigger();
            trigger.triggerType = x.triggerType;
            trigger.meta = x.meta;
            trigger.updateSchedule = x.updateSchedule;
            return trigger;
        });
        model.triggers = triggers;

        return this.repository.save(model);
    }

    async findAll(): Promise<CustomBot[]> {
        return this.repository.find({
            order: { createdDate: "DESC" },
            // where: {
            //     ownerId,
            // },
        });
    }

    async findOne(uuid: string): Promise<CustomBot | undefined> {
        return this.repository.findOne({
            order: { createdDate: "DESC" },
            where: {
                uuid,
            },
        });
    }

    async trigger(uuid: string): Promise<void> {
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
        updateCustomBotDto: UpdateCustomBotDto
    ): Promise<CustomBot> {
        const customBot = await this.repository.findOne({
            order: { createdDate: "DESC" },
            where: {
                uuid,
            },
        });

        if (!customBot) {
            throw new NotFoundException();
        }

        customBot.checkSchedule = updateCustomBotDto.checkSchedule;

        return this.repository.save(customBot);
    }

    async remove(uuid: string): Promise<void> {
        const foundEntity = await this.repository.findOne({
            order: { createdDate: "DESC" },
            where: {
                uuid,
            },
        });
        if (!foundEntity) {
            return;
        }
        await this.repository.remove([foundEntity]);
    }
}
