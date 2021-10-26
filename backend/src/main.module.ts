import { Module } from "@nestjs/common";
import "reflect-metadata";
import {
    CoreModule,
    AuthzModule,
    DatabaseModule,
    EmailClientModule,
} from "@darraghor/nest-backend-libs";
import { TriggerModule } from "./trigger/trigger.module";
import { TriggerResultModule } from "./trigger-result/trigger-result.module";
import { CustomBotModule } from "./custom-bot/custom-bot.module";
import { BotTriggerActivationModule } from "./bot-trigger-activation/bot-trigger-activation.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        AuthzModule,
        EmailClientModule,
        TriggerModule,
        TriggerResultModule,
        CustomBotModule,
        BotTriggerActivationModule,
        ScheduleModule.forRoot(),
    ],
    providers: [],
})
export class MainModule {}
