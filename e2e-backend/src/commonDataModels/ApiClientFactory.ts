import {
    BaseAPI,
    Configuration,
    ApplicationSupportApi,
    EmailClientApi,
    PersonsApi,
    OrganisationsApi,
    CustomBotApi,
    TriggersApi,
} from "shared-api-client";
import { AuthenticatedRequests } from "./AuthenticatedRequests";
import fetch from "node-fetch";

export class ApiClientFactory {
    static contentType = "content-type";
    static jsonType = "application/json";
    static validToken = "";

    public static getAll(): {
        applicationSupportApi: ApplicationSupportApi;
        personApi: PersonsApi;
        organisationApi: OrganisationsApi;
        customBotApi: CustomBotApi;
        emailClientApi: EmailClientApi;
        triggerApi: TriggersApi;
    } {
        return {
            applicationSupportApi: ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi
            ),
            personApi: ApiClientFactory.getAuthenticatedApiInstance(PersonsApi),
            organisationApi:
                ApiClientFactory.getAuthenticatedApiInstance(OrganisationsApi),
            customBotApi:
                ApiClientFactory.getAuthenticatedApiInstance(CustomBotApi),
            emailClientApi:
                ApiClientFactory.getAuthenticatedApiInstance(EmailClientApi),
            triggerApi:
                ApiClientFactory.getAuthenticatedApiInstance<TriggersApi>(
                    TriggersApi
                ),
        };
    }
    public static getAuthenticatedApiInstance<T extends BaseAPI>(apiService: {
        new (apiConfig: Configuration): T;
    }): T {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            accessToken: AuthenticatedRequests.validToken,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            fetchApi: fetch as any,
        });
        return new apiService(apiConfig);
    }
}
