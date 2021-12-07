import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "react-query";
import { Trigger, TriggersApi, UpdateTriggerDto } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../../api/apiInstanceFactories";
import wellKnownQueries from "../wellKnownQueries";
import customBotsWellKnownQueries from "../../customBots/wellKnownQueries";

type EditTriggerVariables = {
    model: UpdateTriggerDto;
    botUuid: string;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    model: UpdateTriggerDto,
    botuuid: string
): Promise<Trigger> => {
    const apiClient = await getAuthenticatedApiInstance(
        TriggersApi,
        getAccessTokenSilently
    );
    return apiClient.triggerControllerUpdate({
        botuuid: botuuid,
        updateTriggerDto: model,
    });
};

export default function useEditTrigger() {
    const { getAccessTokenSilently } = useAuth0();
    const queryClient = useQueryClient();
    return useMutation(
        wellKnownQueries.updateTrigger,
        async (variables: EditTriggerVariables) =>
            apiRequest(
                getAccessTokenSilently,
                variables.model,
                variables.botUuid
            ),
        {
            onSettled: (data) => {
                // delay is from a different type of query. can possibly remove here
                setTimeout(function () {
                    queryClient.invalidateQueries([
                        customBotsWellKnownQueries.customBotsGetOne,
                        customBotsWellKnownQueries.customBotsGetAllMine,
                        wellKnownQueries.getOneTrigger,
                    ]);
                    return;
                }, 500);
            },
        }
    );
}
