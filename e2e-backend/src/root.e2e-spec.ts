/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApplicationSupportApi, Configuration } from "shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import fetch from "node-fetch";

describe("When using a valid token", () => {
    const { applicationSupportApi } = ApiClientFactory.getAll();
    it("unsecure endpoints are reachable", async () => {
        const result = await applicationSupportApi.appControllerGetHello();

        expect(result).toBe("Hello World!");
    });

    it("secure endpoints are reachable", async () => {
        const authResult =
            await applicationSupportApi.appControllerGetHelloAuthorized();

        expect(authResult).toBe("Hello World!");
    });

    it("access blocked if not authenticated", async () => {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            fetchApi: fetch as any,
        });
        const unauthenticatedApi = new ApplicationSupportApi(apiConfig);

        return expect(
            unauthenticatedApi.appControllerGetHelloAuthorized()
        ).rejects.toMatchObject({ status: 401 });
    });
});
