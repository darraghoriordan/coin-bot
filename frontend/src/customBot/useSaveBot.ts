import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

import { CreateCustomBotDto, CustomBot, CustomBotApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../api/apiInstanceFactories";

import wellKnownQueries from "./wellKnownQueries";

type SaveOfferSubmissionMutationVariables = {
    model: CreateCustomBotDto;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    model: CreateCustomBotDto
): Promise<CustomBot> => {
    const apiClient = await getAuthenticatedApiInstance(
        CustomBotApi,
        getAccessTokenSilently
    );
    return apiClient.customBotControllerCreate({
        createCustomBotDto: model,
    });
};

export default function useSaveBot() {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation(
        wellKnownQueries.saveCustomBot,
        async (variables: SaveOfferSubmissionMutationVariables) =>
            apiRequest(getAccessTokenSilently, variables.model)
    );
}
