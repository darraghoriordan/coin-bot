import {
    BaseAPI,
    Configuration,
    ApplicationSupportApi,
    EmailClientApi,
} from "../../../shared-api-client/dist";
import { AuthenticatedRequests } from "./AuthenticatedRequests";
import fetch from "node-fetch";

export class ApiClientFactory {
    static contentType: string = "content-type";
    static jsonType: string = "application/json";
    static validToken: string = "";

    public static getAll(): {
        applicationSupportApi: ApplicationSupportApi;
        emailClientApi: EmailClientApi;
    } {
        return {
            applicationSupportApi: ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi
            ),
            emailClientApi:
                ApiClientFactory.getAuthenticatedApiInstance(EmailClientApi),
        };
    }
    public static getAuthenticatedApiInstance<T extends BaseAPI>(apiService: {
        new (apiConfig: Configuration): T;
    }) {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            accessToken: AuthenticatedRequests.validToken,
            fetchApi: fetch as any,
        });
        return new apiService(apiConfig);
    }
}
