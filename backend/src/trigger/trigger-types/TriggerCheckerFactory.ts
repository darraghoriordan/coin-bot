import { Injectable } from "@nestjs/common";
import { TriggerTypeEnum } from "../entities/TriggerTypeEnum";
import { TriggerChecker } from "./TriggerChecker";
import { TwitterUserMentionCheck } from "./twitter-user-mention/trigger-check";

@Injectable()
export class TriggerCheckerFactory {
    public getChecker(triggerType: TriggerTypeEnum): TriggerChecker {
        switch (triggerType) {
            case TriggerTypeEnum.NO_ACTION_DEFAULT:
            case TriggerTypeEnum.TWITTER_USER_MENTION:
                return new TwitterUserMentionCheck();
        }
    }
}
