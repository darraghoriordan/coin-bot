import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { CustomBot, CustomBotApi } from "shared-api-client";
import wellKnownQueries from "../wellKnownQueries";
import { getAuthenticatedApiInstance } from "../../api/apiInstanceFactories";

const apiCall = async (
    getAccessTokenSilently: (
        options?: GetTokenSilentlyOptions | undefined
    ) => Promise<string>
): Promise<CustomBot[]> => {
    const apiClient = await getAuthenticatedApiInstance(
        CustomBotApi,
        getAccessTokenSilently
    );

    return apiClient.customBotControllerFindAll();
};

export default function useGetAllMyBots() {
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(wellKnownQueries.customBotsGetAllMine, () =>
        apiCall(getAccessTokenSilently)
    );
}
