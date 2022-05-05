/* eslint-disable @typescript-eslint/naming-convention */
import { BinanceConfigurationService } from "./BinanceConfigurationService";
import { MainClient } from "binance";

export const BinanceClientProvider = {
    provide: MainClient,
    useFactory: (config: BinanceConfigurationService) => {
        return new MainClient({
            api_key: config.apiKey,
            api_secret: config.secretKey,
        });
    },
    inject: [BinanceConfigurationService],
};
