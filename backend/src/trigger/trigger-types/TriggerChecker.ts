import { Trigger } from "../entities/trigger.entity";

export interface TriggerChecker {
    shouldHandle(trigger: Trigger): boolean;
    check(trigger: Trigger): Promise<boolean>;
}
