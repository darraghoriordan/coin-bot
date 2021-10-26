import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When using the email client", () => {
    const { emailClientApi } = ApiClientFactory.getAll();

    // eslint-disable-next-line @typescript-eslint/require-await
    it("I can verify the email settings", async () => {
        return (
            // eslint-disable-next-line jest/valid-expect
            expect(() => emailClientApi.emailClientControllerVerify()).resolves
        );
    });
});
