import { Module } from "@nestjs/common";
import { CustomBotService } from "./custom-bot.service";
import { CustomBotController } from "./custom-bot.controller";
import { CustomBot } from "./entities/custom-bot.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Trigger } from "../trigger/entities/trigger.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CustomBot, Trigger])],
    controllers: [CustomBotController],
    providers: [CustomBotService],
})
export class CustomBotModule {}
