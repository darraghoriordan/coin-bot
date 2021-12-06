import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";
import { TriggersApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";
import wellKnownQueries from "./wellKnownQueries";
import customBotsWellKnownQueries from "../customBots/wellKnownQueries";

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
        TriggersApi,
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
        wellKnownQueries.deleteTrigger,
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
                    queryClient.invalidateQueries([
                        customBotsWellKnownQueries.customBotsGetOne,
                        customBotsWellKnownQueries.customBotsGetAllMine,
                    ]);
                    return;
                }, 500);
            },
        }
    );
}
