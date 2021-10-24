import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trigger } from "../trigger/entities/trigger.entity";
import { TriggerResult } from "./entities/trigger-result.entity";
import { TriggerResultService } from "./trigger-result.service";

@Module({
    imports: [TypeOrmModule.forFeature([TriggerResult, Trigger])],
    providers: [TriggerResultService],
    exports: [TriggerResultService],
})
export class TriggerResultModule {}
