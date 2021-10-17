import { Trigger } from "../entities/trigger.entity";

export interface TriggerChecker {
    check(trigger: Trigger): boolean;
}
