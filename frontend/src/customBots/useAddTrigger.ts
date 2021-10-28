import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";

import { CreateTriggerDto, Trigger, TriggersApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

type AddTriggerVariables = {
    model: CreateTriggerDto;
    botuuid: string;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    model: CreateTriggerDto,
    botuuid: string
): Promise<Trigger> => {
    const apiClient = await getAuthenticatedApiInstance(
        TriggersApi,
        getAccessTokenSilently
    );
    return apiClient.triggerControllerCreate({
        botuuid: botuuid,
        createTriggerDto: model,
    });
};

export default function useAddTrigger() {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();
    return useMutation(
        wellKnownQueries.addTrigger,
        async (variables: AddTriggerVariables) =>
            apiRequest(
                getAccessTokenSilently,
                variables.model,
                variables.botuuid
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
