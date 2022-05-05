import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BinanceModule } from "../binance/binance.module";
import { CustomBot } from "../custom-bot/entities/custom-bot.entity";
import { TwitterSearchModule } from "../twitter-search/twitter-search.module";
import { Trigger } from "./entities/trigger.entity";
import TriggerMetaMapper from "./trigger-meta-mapper";
import { BinanceAverageAboveCheck } from "./trigger-types/binance-avg-above/trigger-check";
import { NoActionTestCheck } from "./trigger-types/no-action-test/trigger-check";
import { TriggerCheckerProvider } from "./trigger-types/TriggerCheckerProvider";
import { TwitterUserMentionCheck } from "./trigger-types/twitter-user-mention/trigger-check";
import { TriggerController } from "./trigger.controller";
import { TriggerService } from "./trigger.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Trigger, CustomBot]),
        TwitterSearchModule,
        BinanceModule,
    ],
    providers: [
        TriggerCheckerProvider,
        TriggerService,
        TriggerMetaMapper,
        TwitterUserMentionCheck,
        BinanceAverageAboveCheck,
        NoActionTestCheck,
    ],
    exports: [TriggerMetaMapper, TriggerCheckerProvider],
    controllers: [TriggerController],
})
export class TriggerModule {}
