import {
    CoreLoggerService,
    DefaultAuthGuard,
} from "@darraghor/nest-backend-libs";

import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { BinanceService } from "./binance.service";

@ApiTags("Custom Bot")
@ApiBearerAuth()
@UseGuards(DefaultAuthGuard)
@Controller("binance-client")
export class BinanceClientController {
    constructor(
        private readonly binanceService: BinanceService,
        private readonly logger: CoreLoggerService
    ) {}

    @Get("avg-price/btc")
    @ApiOkResponse({ type: String })
    getAvgPrice(): Promise<string> {
        // lazy auth
        // if (request.user.auth0UserId !== "auth0|60489daf3007dc0069427247") {
        //     return Promise.resolve([]);
        // }

        this.logger.debug("price lookup called");

        return this.binanceService.getAvgPrice("BTCUSDT");
    }
}
