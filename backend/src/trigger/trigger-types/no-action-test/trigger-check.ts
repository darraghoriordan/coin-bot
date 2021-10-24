import { Injectable } from "@nestjs/common";
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
    public async check(trigger: Trigger): Promise<boolean> {
        return Promise.resolve(true);
    }
}
