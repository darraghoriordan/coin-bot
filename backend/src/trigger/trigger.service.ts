import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomBot } from "../custom-bot/entities/custom-bot.entity";
import { CreateTriggerDto } from "./dto/create-trigger.dto";
import { UpdateTriggerDto } from "./dto/update-trigger.dto";
import { Trigger } from "./entities/trigger.entity";
import TriggerMetaMapper from "./trigger-meta-mapper";

@Injectable()
export class TriggerService {
    constructor(
        @InjectRepository(Trigger)
        private triggerRepository: Repository<Trigger>,
        @InjectRepository(CustomBot)
        private botRepository: Repository<CustomBot>,
        private triggerMetaMapper: TriggerMetaMapper
    ) {}

    async create(
        createTriggerResultDto: CreateTriggerDto,
        customBotUuid: string,
        ownerId: string
    ): Promise<Trigger> {
        // get the bot, add a trigger
        const bot = await this.botRepository.findOneOrFail({
            uuid: customBotUuid,
            ownerId,
        });

        const trigger = this.triggerRepository.create();
        trigger.triggerType = createTriggerResultDto.triggerType;
        trigger.updateSchedule = createTriggerResultDto.updateSchedule;

        trigger.meta = this.triggerMetaMapper.mapMeta(
            createTriggerResultDto.allMeta,
            createTriggerResultDto.triggerType
        );
        bot.triggers.push(trigger);

        await this.botRepository.save(bot);

        return trigger;
    }

    async update(
        updateTriggerResultDto: UpdateTriggerDto,
        customBotUuid: string,
        ownerId: string
    ): Promise<Trigger> {
        // just checking for ownership
        const bot = await this.botRepository.findOneOrFail({
            uuid: customBotUuid,
            ownerId,
        });

        const trigger = bot.triggers.find(
            (t) => t.uuid === updateTriggerResultDto.uuid
        );
        if (!trigger) {
            throw new NotFoundException();
        }

        trigger.triggerType = updateTriggerResultDto.triggerType;
        trigger.updateSchedule = updateTriggerResultDto.updateSchedule;

        trigger.meta = this.triggerMetaMapper.mapMeta(
            updateTriggerResultDto.allMeta,
            updateTriggerResultDto.triggerType
        );

        return this.triggerRepository.save(trigger);
    }

    async remove(
        customBotUuid: string,
        triggeruuid: string,
        ownerId: string
    ): Promise<Trigger> {
        // just checking for ownership
        const bot = await this.botRepository.findOneOrFail({
            uuid: customBotUuid,
            ownerId,
        });

        const trigger = bot.triggers.find((t) => t.uuid === triggeruuid);
        if (!trigger) {
            throw new NotFoundException();
        }

        return this.triggerRepository.remove(trigger);
    }
}
