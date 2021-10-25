import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Trigger } from "../trigger/entities/trigger.entity";
import { CreateTriggerResultDto } from "./dto/create-trigger-result.dto";
import { TriggerResult } from "./entities/trigger-result.entity";

@Injectable()
export class TriggerResultService {
    constructor(
        @InjectRepository(TriggerResult)
        private repository: Repository<TriggerResult>,
        @InjectRepository(Trigger)
        private triggerRepository: Repository<Trigger>
    ) {}

    async create(
        createTriggerResultDto: CreateTriggerResultDto
    ): Promise<TriggerResult> {
        const trigger = await this.triggerRepository.findOneOrFail({
            id: createTriggerResultDto.triggerId,
        });
        const model = this.repository.create({
            result: createTriggerResultDto.result,
            errorMessage: createTriggerResultDto.errorMessage,
            errorState: createTriggerResultDto.errorState,
            triggerId: trigger.id,
        });
        return this.repository.save(model);
    }

    async findAll(): Promise<TriggerResult[]> {
        return this.repository.find({
            order: { createdDate: "DESC" },
            withDeleted: false,
            // where: {
            //     ownerId,
            // },
        });
    }
}
