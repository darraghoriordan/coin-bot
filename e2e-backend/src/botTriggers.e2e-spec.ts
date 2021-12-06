import {
    CreateCustomBotDto,
    CreateTriggerDto,
    CustomBot,
    NoActionTestMeta,
    RunningStateEnum,
    TriggerTypeEnum,
    TwitterUserMentionMeta,
} from "shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When working with bot triggers", () => {
    const { customBotApi, triggerApi } = ApiClientFactory.getAll();
    let getBotWithTriggers: CustomBot;
    let savedBotUuid: string;
    const botModel = {
        runEveryInSeconds: 3100,
        runningState: RunningStateEnum.STARTED,
        name: "Super Manual Bot",
    } as CreateCustomBotDto;

    beforeAll(async () => {
        const result = await customBotApi.customBotControllerFindAll();

        for (const bot of result) {
            await customBotApi.customBotControllerRemove({
                uuid: bot.uuid,
            });
        }
    });

    // eslint-disable-next-line sonarjs/no-identical-functions
    afterAll(async () => {
        const result = await customBotApi.customBotControllerFindAll();

        for (const bot of result) {
            await customBotApi.customBotControllerRemove({
                uuid: bot.uuid,
            });
        }
    });

    it("I can save a custom bot", async () => {
        try {
            const saveResponse = await customBotApi.customBotControllerCreate({
                createCustomBotDto: botModel,
            });
            expect(saveResponse.uuid).not.toBeUndefined();
            expect(saveResponse).toMatchObject(botModel);
            savedBotUuid = saveResponse.uuid;
        } catch (error: any) {
            console.log("error", error);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            console.log("error", await error.text());
        }
    });

    it("I can save triggers to the custom bot and get them", async () => {
        try {
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
                console.log("Saving trigger...", t);
                const triggerResponse =
                    await triggerApi.triggerControllerCreate({
                        botuuid: savedBotUuid,
                        createTriggerDto: t,
                    });
                console.log("Got past trigger creation...");
                expect(triggerResponse.uuid).not.toBeUndefined();
                expect(triggerResponse.triggerType).not.toBeUndefined();
            }

            getBotWithTriggers = await customBotApi.customBotControllerFindOne({
                uuid: savedBotUuid,
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
