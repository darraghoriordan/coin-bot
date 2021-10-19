import { TriggerTypeEnum, TwitterUserMentionMeta } from "shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When getting a user", () => {
    const { customBotApi } = ApiClientFactory.getAll();

    it("I can get myself", async () => {
        const saveResponse = await customBotApi.customBotControllerCreate({
            createCustomBotDto: {
                checkSchedule: "*/30 * * * *",
                triggers: [
                    {
                        meta: {
                            twitterUserName: "@darraghor",
                            mentionText: "someString",
                            inLastSeconds: 1800,
                        } as TwitterUserMentionMeta,
                        triggerType: TriggerTypeEnum.TWITTER_USER_MENTION,
                        updateSchedule: "*/30 * * * *",
                    },
                ],
            },
        });
        expect(saveResponse.uuid).not.toBeUndefined;
    });
});
