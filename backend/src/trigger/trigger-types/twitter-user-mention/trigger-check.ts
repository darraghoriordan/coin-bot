import { Injectable } from "@nestjs/common";
import { Trigger } from "../../entities/trigger.entity";
import { TriggerChecker } from "../TriggerChecker";
import { TriggerTypeEnum } from "../TriggerTypeEnum";

@Injectable()
export class TwitterUserMentionCheck implements TriggerChecker {
    public shouldHandle(trigger: Trigger): boolean {
        if (trigger.triggerType !== TriggerTypeEnum.TWITTER_USER_MENTION) {
            return false;
        }
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async check(trigger: Trigger): Promise<boolean> {
        // validate and convert
        // shouldRun()?
        // startTime: now -inLastSeconds
        // endTime: now
        // log datetimes
        // get tweets between datetime now and
        // if text present
        // return true
        // else
        return Promise.resolve(true);
    }
}
