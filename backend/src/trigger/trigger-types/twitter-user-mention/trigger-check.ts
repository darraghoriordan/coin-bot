import { Trigger } from "../../entities/trigger.entity";
import { TriggerChecker } from "../TriggerChecker";

export class TwitterUserMentionCheck implements TriggerChecker {
    public check(trigger: Trigger): boolean {
        // validate and convert
        // shouldRun()?
        // startTime: now -inLastSeconds
        // endTime: now
        // log datetimes
        // get tweets between datetime now and
        // if text present
        // return true
        // else
        return false;
    }
}
