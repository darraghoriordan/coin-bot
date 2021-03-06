import {
    CoreLoggerService,
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
import { NoActionTestMeta } from "../trigger/trigger-types/no-action-test/meta-data";
import { TwitterUserMentionMeta } from "../trigger/trigger-types/twitter-user-mention/meta-data";
import { CustomBotService } from "./custom-bot.service";
import { CreateCustomBotDto } from "./dto/create-custom-bot.dto";
import { UpdateCustomBotDto } from "./dto/update-custom-bot.dto";
import { CustomBot } from "./entities/custom-bot.entity";

@ApiTags("Custom Bot")
@ApiBearerAuth()
@UseGuards(DefaultAuthGuard)
@ApiExtraModels(TwitterUserMentionMeta, Trigger, NoActionTestMeta)
@Controller("custom-bot")
export class CustomBotController {
    constructor(
        private readonly customBotService: CustomBotService,
        private readonly logger: CoreLoggerService
    ) {}

    @Post()
    @ApiCreatedResponse({ type: CustomBot })
    create(
        @Body() createCustomBotDto: CreateCustomBotDto,
        @Request() request: RequestWithUser
    ): Promise<CustomBot> {
        this.logger.log("creating custombot", createCustomBotDto);

        return this.customBotService.create(
            createCustomBotDto,
            request.user.uuid
        );
    }

    @Get()
    @ApiOkResponse({ type: CustomBot, isArray: true })
    findAll(@Request() request: RequestWithUser): Promise<CustomBot[]> {
        return this.customBotService.findAll(request.user.uuid);
    }

    @Get(":uuid")
    @ApiOkResponse({ type: CustomBot })
    async findOne(
        @Param("uuid") uuid: string,
        @Request() request: RequestWithUser
    ): Promise<CustomBot> {
        this.logger.log("Retrieving customBot", uuid);
        const result = await this.customBotService.findOne(
            uuid,
            request.user.uuid
        );
        this.logger.log("Retrieving customBot - returning", result);
        return result;
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
