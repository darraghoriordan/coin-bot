import {
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";
import { Trigger } from "../trigger/entities/trigger.entity";
import { TwitterUserMentionMeta } from "../trigger/trigger-types/twitter-user-mention/meta-data";
import { CustomBotService } from "./custom-bot.service";
import { CreateCustomBotDto } from "./dto/create-custom-bot.dto";
import { UpdateCustomBotDto } from "./dto/update-custom-bot.dto";
import { CustomBot } from "./entities/custom-bot.entity";

@ApiTags("Custom Bot")
@ApiBearerAuth()
@UseGuards(DefaultAuthGuard)
@ApiExtraModels(TwitterUserMentionMeta, Trigger)
@Controller("custom-bot")
export class CustomBotController {
    constructor(private readonly customBotService: CustomBotService) {}

    @Post()
    @ApiCreatedResponse({ type: CustomBot })
    create(
        @Body() createCustomBotDto: CreateCustomBotDto,
        @Request() request: RequestWithUser
    ): Promise<CustomBot> {
        return this.customBotService.create(
            createCustomBotDto,
            request.user.uuid
        );
    }

    @Post("trigger/:uuid")
    @ApiOkResponse()
    trigger(
        @Param("uuid") uuid: string,
        @Request() request: RequestWithUser
    ): Promise<void> {
        return this.customBotService.trigger(uuid, request.user.uuid);
    }

    @Get()
    @ApiOkResponse({ type: CustomBot, isArray: true })
    findAll(@Request() request: RequestWithUser): Promise<CustomBot[]> {
        return this.customBotService.findAll(request.user.uuid);
    }

    @Get(":uuid")
    @ApiOkResponse({ type: CustomBot })
    findOne(
        @Param("uuid") uuid: string,
        @Request() request: RequestWithUser
    ): Promise<CustomBot> {
        return this.customBotService.findOne(uuid, request.user.uuid);
    }

    @Patch(":uuid")
    @ApiOkResponse({ type: CustomBot })
    update(
        @Param("uuid") uuid: string,
        @Body() updateCustomBotDto: UpdateCustomBotDto,
        @Request() request: RequestWithUser
    ): Promise<CustomBot> {
        return this.customBotService.update(
            uuid,
            updateCustomBotDto,
            request.user.uuid
        );
    }

    @Delete(":uuid")
    @ApiOkResponse()
    async remove(
        @Param("uuid") uuid: string,
        @Request() request: RequestWithUser
    ): Promise<boolean> {
        const deletedResult = await this.customBotService.remove(
            uuid,
            request.user.uuid
        );
        return deletedResult !== undefined;
    }
}
