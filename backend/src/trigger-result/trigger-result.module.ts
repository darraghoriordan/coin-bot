import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TriggerResult } from "./entities/trigger-result.entity";
import { TriggerResultService } from "./trigger-result.service";

@Module({
    imports: [TypeOrmModule.forFeature([TriggerResult])],
    providers: [TriggerResultService],
})
export class TriggerResultModule {}
