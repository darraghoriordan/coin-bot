import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

import { CustomBotApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

type DeleteBotVariables = {
    botUuid: string;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    botUuid: string
): Promise<void> => {
    const apiClient = await getAuthenticatedApiInstance(
        CustomBotApi,
        getAccessTokenSilently
    );
    return apiClient.customBotControllerRemove({
        uuid: botUuid,
    });
};

export default function useDeleteBot() {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation(
        wellKnownQueries.saveCustomBot,
        async (variables: DeleteBotVariables) =>
            apiRequest(getAccessTokenSilently, variables.botUuid)
    );
}
