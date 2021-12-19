import {
    CoreLoggerService,
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";

import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TweetV2 } from "twitter-api-v2";
import { TwitterSearchService } from "./twitter-search.service";
import { TwitterTestQueryDto } from "./twitter-test-get.dto";

@ApiTags("Custom Bot")
@ApiBearerAuth()
@UseGuards(DefaultAuthGuard)
@Controller("twitter-client")
export class TwitterClientController {
    constructor(
        private readonly twitterService: TwitterSearchService,
        private readonly logger: CoreLoggerService
    ) {}

    @Get()
    @ApiOkResponse({ type: Object, isArray: true })
    findAll(
        @Request() request: RequestWithUser,
        @Query() queryParameters: TwitterTestQueryDto
    ): Promise<TweetV2[]> {
        // lazy auth
        if (request.user.auth0UserId !== "auth0|60489daf3007dc0069427247") {
            return Promise.resolve([]);
        }

        this.logger.debug("searching twitter", {
            queryParams: queryParameters,
        });

        return this.twitterService.findAll(
            queryParameters.twitterName,
            queryParameters.query,
            queryParameters.since
        );
    }
}
