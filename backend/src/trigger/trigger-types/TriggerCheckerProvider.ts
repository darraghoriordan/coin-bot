import { Provider } from "@nestjs/common";
import { NoActionTestCheck } from "./no-action-test/trigger-check";
import { TriggerChecker } from "./TriggerChecker";
import { TwitterUserMentionCheck } from "./twitter-user-mention/trigger-check";

export const TriggerCheckerProvider: Provider<TriggerChecker[]> = {
    provide: "TriggerCheckers",
    useFactory: (twitterUserMentionCheck, noActionTestCheck) =>
        [twitterUserMentionCheck, noActionTestCheck] as TriggerChecker[],
    inject: [TwitterUserMentionCheck, NoActionTestCheck],
};
