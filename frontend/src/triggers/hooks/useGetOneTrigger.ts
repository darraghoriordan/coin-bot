import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";

import { Trigger, TriggersApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../../api/apiInstanceFactories";

import wellKnownQueries from "../wellKnownQueries";

const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    botUuid: string,
    triggerUuid: string
): Promise<Trigger> => {
    const apiClient = await getAuthenticatedApiInstance(
        TriggersApi,
        getAccessTokenSilently
    );
    return apiClient.triggerControllerGetOne({
        botuuid: botUuid,
        triggeruuid: triggerUuid,
    });
};

export default function useGetOneTrigger(botUuid: string, triggerUuid: string) {
    if (!botUuid || botUuid === "") {
        throw new Error("Invalid arguments");
    }
    const { getAccessTokenSilently } = useAuth0();

    return useQuery(
        [wellKnownQueries.getOneTrigger, { botUuid, triggerUuid }],
        () => apiRequest(getAccessTokenSilently, botUuid, triggerUuid)
    );
}
