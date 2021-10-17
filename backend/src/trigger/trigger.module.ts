import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trigger } from "./entities/trigger.entity";
import { TriggerCheckerFactory } from "./trigger-types/TriggerCheckerFactory";

@Module({
    imports: [TypeOrmModule.forFeature([Trigger])],
    providers: [TriggerCheckerFactory],
})
export class TriggerModule {}
