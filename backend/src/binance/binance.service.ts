import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { MainClient } from "binance";

@Injectable()
export class BinanceService {
    constructor(
        private readonly binanceClient: MainClient,
        private readonly logger: CoreLoggerService
    ) {}
    // BTCUSDT
    public async getAvgPrice(coinSymbol: string): Promise<string> {
        const result = await this.binanceClient.getAvgPrice({
            symbol: coinSymbol,
        });
        this.logger.log("received price", result);
        return result.price as any as string;
    }
}
