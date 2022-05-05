import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BinanceClientController } from "./binance-client.controller";
import { BinanceClientProvider } from "./binance-client.provider";
import { BinanceService } from "./binance.service";
import { BinanceConfigurationService } from "./BinanceConfigurationService";
import configVariables from "./BinanceConfigurationVariables";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    controllers: [BinanceClientController],
    providers: [
        BinanceConfigurationService,
        BinanceService,
        BinanceClientProvider,
    ],
    exports: [BinanceService],
})
export class BinanceModule {}
