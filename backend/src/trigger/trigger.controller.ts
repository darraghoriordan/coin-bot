import {
    CoreLoggerService,
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";

import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseGuards,
    Get,
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
import { CreateTriggerDto } from "./dto/create-trigger.dto";
import { UpdateTriggerDto } from "./dto/update-trigger.dto";
import { TriggerService } from "./trigger.service";

@ApiTags("Triggers")
@ApiBearerAuth()
@UseGuards(DefaultAuthGuard)
@ApiExtraModels(TwitterUserMentionMeta, Trigger, NoActionTestMeta)
@Controller("custom-bot")
export class TriggerController {
    constructor(
        private readonly triggerService: TriggerService,
        private readonly logger: CoreLoggerService
    ) {}

    @Post(":botuuid/trigger")
    @ApiCreatedResponse({ type: Trigger })
    async create(
        @Body() createTriggerDto: CreateTriggerDto,
        @Param("botuuid") botuuid: string,
        @Request() request: RequestWithUser
    ): Promise<Trigger> {
        this.logger.log("creating trigger", createTriggerDto);

        const trigger = await this.triggerService.create(
            createTriggerDto,
            botuuid,
            request.user.uuid
        );

        this.logger.log("creating trigger - result", trigger);
        return trigger;
    }

    @Patch(":botuuid/trigger")
    @ApiOkResponse({ type: Trigger })
    update(
        @Param("botuuid") botuuid: string,
        @Body() updateTriggerDto: UpdateTriggerDto,
        @Request() request: RequestWithUser
    ): Promise<Trigger> {
        return this.triggerService.update(
            updateTriggerDto,
            botuuid,
            request.user.uuid
        );
    }

    @Get(":botuuid/trigger/:triggeruuid")
    @ApiOkResponse({ type: Trigger })
    async getOne(
        @Param("botuuid") botuuid: string,
        @Param("triggeruuid") triggeruuid: string,
        @Request() request: RequestWithUser
    ): Promise<Trigger> {
        return this.triggerService.findOne(
            botuuid,
            triggeruuid,
            request.user.uuid
        );
    }

    @Delete(":botuuid/trigger/:triggeruuid")
    @ApiOkResponse()
    async remove(
        @Param("botuuid") botuuid: string,
        @Param("triggeruuid") triggeruuid: string,
        @Request() request: RequestWithUser
    ): Promise<boolean> {
        const deletedResult = await this.triggerService.remove(
            botuuid,
            triggeruuid,
            request.user.uuid
        );
        return deletedResult !== undefined;
    }
}
