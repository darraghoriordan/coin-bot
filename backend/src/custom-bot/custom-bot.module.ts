import { Module } from "@nestjs/common";
import { CustomBotService } from "./custom-bot.service";
import { CustomBotController } from "./custom-bot.controller";
import { CustomBot } from "./entities/custom-bot.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CustomBot])],
    controllers: [CustomBotController],
    providers: [CustomBotService],
})
export class CustomBotModule {}
