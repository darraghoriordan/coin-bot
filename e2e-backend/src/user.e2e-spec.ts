import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When getting a user", () => {
    const { personApi } = ApiClientFactory.getAll();

    it("I can get myself", async () => {
        const me = await personApi.personControllerFindSelf();
        expect(me.auth0UserId).not.toBeUndefined;
    });
});
