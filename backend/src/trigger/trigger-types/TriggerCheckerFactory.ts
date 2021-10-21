import { Injectable } from "@nestjs/common";
import { TriggerTypeEnum } from "./TriggerTypeEnum";
import { TriggerChecker } from "./TriggerChecker";
import { TwitterUserMentionCheck } from "./twitter-user-mention/trigger-check";
import { NoActionTestCheck } from "./no-action-test/trigger-check";

@Injectable()
export class TriggerCheckerFactory {
    public getChecker(triggerType: TriggerTypeEnum): TriggerChecker {
        switch (triggerType) {
            case TriggerTypeEnum.NO_ACTION_DEFAULT:
                return new NoActionTestCheck();
            case TriggerTypeEnum.TWITTER_USER_MENTION:
                return new TwitterUserMentionCheck();
        }
    }
}
