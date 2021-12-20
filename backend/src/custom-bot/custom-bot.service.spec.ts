import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import createMockInstance from "jest-create-mock-instance";
import { Repository } from "typeorm";
import { Trigger } from "../trigger/entities/trigger.entity";
import { CustomBotService } from "./custom-bot.service";
import { CustomBot } from "./entities/custom-bot.entity";

describe("CustomBotService", () => {
    let classUnderTest: CustomBotService;

    let loggerMock: jest.Mocked<CoreLoggerService>;
    let repositoryMock: jest.Mocked<Repository<CustomBot>>;

    beforeEach(() => {
        jest.resetAllMocks();

        loggerMock = createMockInstance(CoreLoggerService);
        repositoryMock = createMockInstance(Repository) as jest.Mocked<
            Repository<CustomBot>
        >;
        classUnderTest = new CustomBotService(repositoryMock, loggerMock);
    });

    test.each([
        [
            "1 bot due to run (over-time)",
            new Date(2019, 10, 1, 1, 2, 0),
            new Date(2019, 10, 1, 1, 2, 20),
            true,
            20,
            1,
        ],
        [
            "0 bot due to run (no triggers set)",
            new Date(2019, 10, 1, 1, 2, 0),
            new Date(2019, 10, 1, 1, 2, 20),
            false,
            20,
            0,
        ],
        [
            "0 bots due to run (too soon since last)",
            new Date(2019, 10, 1, 1, 2, 0),
            new Date(2019, 10, 1, 1, 2, 19),
            true,
            20,
            0,
        ],
        [
            "0 bots due to run (too soon since last and no triggers)",
            new Date(2019, 10, 1, 1, 2, 0),
            new Date(2019, 10, 1, 1, 2, 19),
            false,
            20,
            0,
        ],
    ])(
        "is an expected response filtering on dates %s",
        (
            reason: string,
            lastRun: Date,
            nowDate: Date,
            addATrigger: boolean,
            runEveryInSeconds: number,
            expectedBotsToRun: number
        ) => {
            const trigger = new Trigger();
            const botOne = new CustomBot();
            if (addATrigger) {
                botOne.triggers = [trigger];
            }

            botOne.lastRun = lastRun;
            botOne.runEveryInSeconds = runEveryInSeconds;

            const data = [botOne];
            const result = classUnderTest.filterBotsToRun(
                data,
                nowDate.getTime()
            );
            expect(result.length).toEqual(expectedBotsToRun);
        }
    );
});
