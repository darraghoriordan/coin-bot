import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { BinanceService } from "../../../binance/binance.service";
import { TriggerCheckResult } from "../../dto/triggerCheckReult";
import { Trigger } from "../../entities/trigger.entity";
import { TriggerChecker } from "../TriggerChecker";
import { TriggerTypeEnum } from "../TriggerTypeEnum";
import { BinanceAverageAboveMeta } from "./meta-data";

@Injectable()
export class BinanceAverageAboveCheck implements TriggerChecker {
    constructor(
        private readonly binanceService: BinanceService,
        private readonly logger: CoreLoggerService
    ) {}
    public shouldHandle(trigger: Trigger): boolean {
        if (trigger.triggerType !== TriggerTypeEnum.BINANCE_AVG_PRICE_ABOVE) {
            return false;
        }
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async check(trigger: Trigger): Promise<TriggerCheckResult> {
        const meta = trigger.meta as BinanceAverageAboveMeta;
        const { aboveLimit, binanceSymbol } = meta;

        const lastRun = trigger.customBot.lastRun;

        // get tweets between datetime now and
        const averagePrice = await this.binanceService.getAvgPrice(
            binanceSymbol
        );
        this.logger.debug("result for binance average price", {
            averagePrice,
            meta,
            lastRun,
        });
        const priceAsNumber = Number.parseFloat(averagePrice);

        if (priceAsNumber >= aboveLimit) {
            const result = new TriggerCheckResult();
            result.result = true;
            result.triggerReason = "Current price is above limit";

            return result;
        }
        const result = new TriggerCheckResult();
        result.result = false;
        result.triggerReason = "Current price is not above the limit";

        return result;
    }
}
