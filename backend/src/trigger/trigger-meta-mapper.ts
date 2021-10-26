import { Injectable } from "@nestjs/common";
import AllMetaTypes from "./trigger-types/all-meta-types.dto";
import { NoActionTestMeta } from "./trigger-types/no-action-test/meta-data";
import { TriggerTypeEnum } from "./trigger-types/TriggerTypeEnum";
import { TwitterUserMentionMeta } from "./trigger-types/twitter-user-mention/meta-data";

@Injectable()
export default class TriggerMetaMapper {
    public mapMeta(
        meta: AllMetaTypes,
        triggerType: TriggerTypeEnum
    ): TwitterUserMentionMeta | NoActionTestMeta {
        switch (triggerType) {
            case TriggerTypeEnum.NO_ACTION_DEFAULT:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return meta.noActionTestMeta!;
            case TriggerTypeEnum.TWITTER_USER_MENTION:
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return meta.twitterUserMentionMeta!;
        }
    }
}
