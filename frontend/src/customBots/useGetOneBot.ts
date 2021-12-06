import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

import { CustomBot, CustomBotApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    botUuid: string
): Promise<CustomBot> => {
    const apiClient = await getAuthenticatedApiInstance(
        CustomBotApi,
        getAccessTokenSilently
    );
    return apiClient.customBotControllerFindOne({
        uuid: botUuid,
    });
};

export default function useGetOneBot(botUuid: string) {
    if (!botUuid || botUuid === "") {
        throw new Error("Invalid arguments");
    }
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(wellKnownQueries.customBotsGetOne, () =>
        apiRequest(getAccessTokenSilently, botUuid)
    );
}
