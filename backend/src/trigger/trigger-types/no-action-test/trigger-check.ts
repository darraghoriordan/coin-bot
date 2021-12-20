import { Injectable } from "@nestjs/common";
import { TriggerCheckResult } from "../../dto/triggerCheckReult";
import { Trigger } from "../../entities/trigger.entity";
import { TriggerChecker } from "../TriggerChecker";
import { TriggerTypeEnum } from "../TriggerTypeEnum";

@Injectable()
export class NoActionTestCheck implements TriggerChecker {
    public shouldHandle(trigger: Trigger): boolean {
        if (trigger.triggerType !== TriggerTypeEnum.NO_ACTION_DEFAULT) {
            return false;
        }
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async check(trigger: Trigger): Promise<TriggerCheckResult> {
        const result = new TriggerCheckResult();
        result.result = true;
        result.triggerReason = "This trigger always returns true";
        return Promise.resolve(result);
    }
}
