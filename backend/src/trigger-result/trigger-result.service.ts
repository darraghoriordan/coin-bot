import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTriggerResultDto } from "./dto/create-trigger-result.dto";
import { TriggerResult } from "./entities/trigger-result.entity";

@Injectable()
export class TriggerResultService {
    constructor(
        @InjectRepository(TriggerResult)
        private repository: Repository<TriggerResult>
    ) {}

    async create(
        createTriggerResultDto: CreateTriggerResultDto
    ): Promise<TriggerResult> {
        const model = this.repository.create(createTriggerResultDto);
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
