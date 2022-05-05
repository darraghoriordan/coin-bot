import { Injectable } from "@nestjs/common";
import AllMetaTypes from "./trigger-types/all-meta-types.dto";
import { BinanceAverageAboveMeta } from "./trigger-types/binance-avg-above/meta-data";
import { NoActionTestMeta } from "./trigger-types/no-action-test/meta-data";
import { TriggerTypeEnum } from "./trigger-types/TriggerTypeEnum";
import { TwitterUserMentionMeta } from "./trigger-types/twitter-user-mention/meta-data";

@Injectable()
export default class TriggerMetaMapper {
    public mapMeta(
        meta: AllMetaTypes,
        triggerType: TriggerTypeEnum
    ): TwitterUserMentionMeta | NoActionTestMeta | BinanceAverageAboveMeta {
        switch (triggerType) {
            case TriggerTypeEnum.NO_ACTION_DEFAULT:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return meta.noActionTestMeta!;
            case TriggerTypeEnum.TWITTER_USER_MENTION:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return meta.twitterUserMentionMeta!;
            case TriggerTypeEnum.BINANCE_AVG_PRICE_ABOVE:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return meta.binanceAboveAverageMeta!;
        }
    }
}
