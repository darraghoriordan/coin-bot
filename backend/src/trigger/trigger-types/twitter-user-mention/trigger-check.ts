import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { TwitterSearchService } from "../../../twitter-search/twitter-search.service";
import { TriggerCheckResult } from "../../dto/triggerCheckReult";
import { Trigger } from "../../entities/trigger.entity";
import { TriggerChecker } from "../TriggerChecker";
import { TriggerTypeEnum } from "../TriggerTypeEnum";
import { TwitterUserMentionMeta } from "./meta-data";

@Injectable()
export class TwitterUserMentionCheck implements TriggerChecker {
    constructor(
        private readonly twitterService: TwitterSearchService,
        private readonly logger: CoreLoggerService
    ) {}
    public shouldHandle(trigger: Trigger): boolean {
        if (trigger.triggerType !== TriggerTypeEnum.TWITTER_USER_MENTION) {
            return false;
        }
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async check(trigger: Trigger): Promise<TriggerCheckResult> {
        const meta = trigger.meta as TwitterUserMentionMeta;
        const { mentionText, twitterUserName } = meta;
        const trimmedTwitterUsername = twitterUserName.replace(/@/, "");
        const lastRun = trigger.customBot.lastRun;

        // get tweets between datetime now and
        const tweets = await this.twitterService.findAll(
            trimmedTwitterUsername,
            mentionText,
            lastRun
        );
        this.logger.debug("result for tweets user mention trigger", {
            tweets,
            meta,
            lastRun,
        });
        if (tweets.length <= 0) {
            const result = new TriggerCheckResult();
            result.result = false;
            result.triggerReason = "No tweets found";

            return result;
        }
        const result = new TriggerCheckResult();
        result.result = true;
        result.triggerReason = `The following tweets were found: ${tweets
            .map((t) => t.text)
            .join(",")}`;

        return result;
    }
}
