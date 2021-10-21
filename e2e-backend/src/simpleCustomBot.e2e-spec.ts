import {
    CreateCustomBotDto,
    CreateTriggerDto,
    TriggerTypeEnum,
    TwitterUserMentionMeta,
} from "shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When working with a simple bot", () => {
    const { customBotApi } = ApiClientFactory.getAll();

    it("I can save a custom bot", async () => {
        try {
            const customBotModel = {
                createCustomBotDto: {
                    checkSchedule: "*/30 * * * *",
                    triggers: [
                        {
                            allMeta: {
                                twitterUserMentionMeta: {
                                    twitterUserName: "@darraghor",
                                    mentionText: "someString",
                                    inLastSeconds: 1800,
                                } as TwitterUserMentionMeta,
                            },
                            triggerType: TriggerTypeEnum.TWITTER_USER_MENTION,
                            updateSchedule: "*/30 * * * *",
                        } as CreateTriggerDto,
                    ] as CreateTriggerDto[],
                } as CreateCustomBotDto,
            };

            const saveResponse = await customBotApi.customBotControllerCreate(
                customBotModel
            );
            expect(saveResponse.uuid).not.toBeUndefined;
        } catch (error) {
            console.log("error", error);
            console.log("error", await (error as any).text());
        }
    });
});
