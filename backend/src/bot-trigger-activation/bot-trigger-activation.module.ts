import { Module } from "@nestjs/common";
import { CustomBotModule } from "../custom-bot/custom-bot.module";
import { TriggerModule } from "../trigger/trigger.module";
import { BotTriggerActivationController } from "./bot-trigger-activation.controller";
import { BotTriggerActivationService } from "./bot-trigger-activation.service";
import { PersonModule, EmailClientModule } from "@darraghor/nest-backend-libs";
import { TriggerResultModule } from "../trigger-result/trigger-result.module";

@Module({
    imports: [
        CustomBotModule,
        TriggerModule,
        TriggerResultModule,
        PersonModule,
        EmailClientModule,
    ],
    controllers: [BotTriggerActivationController],
    providers: [BotTriggerActivationService],
})
export class BotTriggerActivationModule {}
