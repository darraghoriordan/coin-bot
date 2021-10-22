import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomBot } from "../custom-bot/entities/custom-bot.entity";
import { Trigger } from "./entities/trigger.entity";
import TriggerMetaMapper from "./trigger-meta-mapper";
import { TriggerCheckerFactory } from "./trigger-types/TriggerCheckerFactory";
import { TriggerController } from "./trigger.controller";
import { TriggerService } from "./trigger.service";

@Module({
    imports: [TypeOrmModule.forFeature([Trigger, CustomBot])],
    providers: [TriggerCheckerFactory, TriggerService, TriggerMetaMapper],
    exports: [TriggerMetaMapper],
    controllers: [TriggerController],
})
export class TriggerModule {}
