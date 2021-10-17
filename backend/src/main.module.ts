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

@Module({
    imports: [
        CoreModule,
        DatabaseModule,
        AuthzModule,
        EmailClientModule,
        TriggerModule,
        TriggerResultModule,
        CustomBotModule,
    ],
    providers: [],
})
export class MainModule {}
