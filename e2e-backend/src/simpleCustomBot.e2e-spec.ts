import {
    CreateCustomBotDto,
    CreateTriggerDto,
    NoActionTestMeta,
    RunningStateEnum,
    TriggerTypeEnum,
    TwitterUserMentionMeta,
} from "shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When working with a simple bot", () => {
    const { customBotApi } = ApiClientFactory.getAll();

    it("I can save a custom bot", async () => {
        try {
            const botModel = {
                runEveryInSeconds: 3100,
                runningState: RunningStateEnum.STARTED,
                name: "Super Manual Bot",
            } as CreateCustomBotDto;

            const saveResponse = await customBotApi.customBotControllerCreate({
                createCustomBotDto: botModel,
            });
            expect(saveResponse.uuid).not.toBeUndefined();
            expect(saveResponse).toMatchObject(botModel);
            let getBotWithTriggers =
                await customBotApi.customBotControllerFindOne({
                    uuid: saveResponse.uuid,
                });

            expect(getBotWithTriggers).toMatchObject(botModel);
            const triggers = [
                {
                    allMeta: {
                        noActionTestMeta: {
                            testString: "the string",
                        } as NoActionTestMeta,
                    },
                    triggerType: TriggerTypeEnum.NO_ACTION_DEFAULT,
                } as CreateTriggerDto,
                {
                    allMeta: {
                        twitterUserMentionMeta: {
                            twitterUserName: "@darraghor",
                            mentionText: "someString",
                        } as TwitterUserMentionMeta,
                    },
                    triggerType: TriggerTypeEnum.TWITTER_USER_MENTION,
                } as CreateTriggerDto,
            ] as CreateTriggerDto[];

            for (const t of triggers) {
                const triggerResponse =
                    await customBotApi.triggerControllerCreate({
                        botuuid: saveResponse.uuid,
                        createTriggerDto: t,
                    });

                expect(triggerResponse.uuid).not.toBeUndefined();
                expect(triggerResponse.triggerType).not.toBeUndefined();
            }

            getBotWithTriggers = await customBotApi.customBotControllerFindOne({
                uuid: saveResponse.uuid,
            });

            expect(getBotWithTriggers.triggers).toMatchObject([
                { triggerType: TriggerTypeEnum.NO_ACTION_DEFAULT },
                { triggerType: TriggerTypeEnum.TWITTER_USER_MENTION },
            ]);
        } catch (error: any) {
            console.log("error", error);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            console.log("error", await error.text());
        }
    });
});
