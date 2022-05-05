import { Provider } from "@nestjs/common";
import { BinanceAverageAboveCheck } from "./binance-avg-above/trigger-check";
import { NoActionTestCheck } from "./no-action-test/trigger-check";
import { TriggerChecker } from "./TriggerChecker";
import { TwitterUserMentionCheck } from "./twitter-user-mention/trigger-check";

export const TriggerCheckerProvider: Provider<TriggerChecker[]> = {
    provide: "TriggerCheckers",
    useFactory: (
        twitterUserMentionCheck,
        noActionTestCheck,
        binanceAverageAboveCheck
    ) =>
        [
            twitterUserMentionCheck,
            noActionTestCheck,
            binanceAverageAboveCheck,
        ] as TriggerChecker[],
    inject: [
        TwitterUserMentionCheck,
        NoActionTestCheck,
        BinanceAverageAboveCheck,
    ],
};
