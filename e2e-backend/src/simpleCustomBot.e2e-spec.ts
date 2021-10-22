import {
    CreateCustomBotDto,
    CreateTriggerDto,
    NoActionTestMeta,
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
                    name: "Super Manual Bot",
                } as CreateCustomBotDto,
            };

            const saveResponse = await customBotApi.customBotControllerCreate(
                customBotModel
            );
            expect(saveResponse.uuid).not.toBeUndefined;

            const triggers = [
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
                {
                    allMeta: {
                        noActionTestMeta: {
                            testString: "the string",
                        } as NoActionTestMeta,
                    },
                    triggerType: TriggerTypeEnum.NO_ACTION_DEFAULT,
                    updateSchedule: "*/5 * * * *",
                } as CreateTriggerDto,
            ] as CreateTriggerDto[];

            for (const t of triggers) {
                const triggerResponse =
                    await customBotApi.triggerControllerCreate({
                        botuuid: saveResponse.uuid,
                        createTriggerDto: t,
                    });

                expect(triggerResponse.uuid).not.toBeUndefined;
                expect(triggerResponse.updateSchedule).not.toBeUndefined;
                expect(triggerResponse.triggerType).not.toBeUndefined;
            }
        } catch (error) {
            console.log("error", error);
            console.log("error", await (error as any).text());
        }
    });
});
