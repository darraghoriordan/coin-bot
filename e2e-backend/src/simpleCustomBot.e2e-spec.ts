import { CreateCustomBotDto, RunningStateEnum } from "shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When working with a simple bot", () => {
    const { customBotApi } = ApiClientFactory.getAll();

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

    it("I can get all bots", async () => {
        try {
            const allBots = await customBotApi.customBotControllerFindAll();

            expect(allBots.length).toBe(1);
            expect(allBots[0]).toMatchObject(botModel);
        } catch (error: any) {
            console.log("error", error);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            console.log("error", await error.text());
        }
    });

    it("I can get a single bot", async () => {
        try {
            // now try to get it and compare
            const getBotWithTriggers =
                await customBotApi.customBotControllerFindOne({
                    uuid: savedBotUuid,
                });

            expect(getBotWithTriggers).toMatchObject(botModel);
            expect(getBotWithTriggers.triggers).toMatchObject([]);
        } catch (error: any) {
            console.log("error", error);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            console.log("error", await error.text());
        }
    });
});
