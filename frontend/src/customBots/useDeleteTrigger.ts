import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";

import { CustomBotApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

type RemoveTriggerVariables = {
    botuuid: string;
    triggeruuid: string;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    botuuid: string,
    triggerUuid: string
): Promise<void> => {
    const apiClient = await getAuthenticatedApiInstance(
        CustomBotApi,
        getAccessTokenSilently
    );
    return apiClient.triggerControllerRemove({
        botuuid: botuuid,
        triggeruuid: triggerUuid,
    });
};

export default function useDeleteTrigger() {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();
    return useMutation(
        wellKnownQueries.addTrigger,
        async (variables: RemoveTriggerVariables) =>
            apiRequest(
                getAccessTokenSilently,
                variables.botuuid,
                variables.triggeruuid
            ),
        {
            onSettled: (data) => {
                // delay is from a different type of query. can possibly remove here
                setTimeout(function () {
                    queryClient.invalidateQueries(
                        wellKnownQueries.customBotsGetOne
                    );
                    return;
                }, 500);
            },
        }
    );
}
