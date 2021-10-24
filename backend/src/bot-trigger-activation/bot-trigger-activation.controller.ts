import {
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";

import { Controller, Post, Param, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { BotTriggerActivationService } from "./bot-trigger-activation.service";

@ApiTags("Bot Trigger")
@ApiBearerAuth()
@UseGuards(DefaultAuthGuard)
@Controller("bot-trigger-activation")
export class BotTriggerActivationController {
    constructor(
        private readonly botTriggerActivationService: BotTriggerActivationService
    ) {}

    @Post(":uuid")
    @ApiOkResponse()
    triggerOne(
        @Param("uuid") uuid: string,
        @Request() request: RequestWithUser
    ): Promise<void> {
        return this.botTriggerActivationService.trigger(
            uuid,
            request.user.uuid
        );
    }

    // @Post()
    // @ApiOkResponse()
    // triggerAll(
    //     @Param("uuid") uuid: string,
    //     @Request() request: RequestWithUser
    // ): Promise<void> {
    //     return this.botTriggerActivationService.triggerAll(uuid, request.user.uuid);
    // }
}
