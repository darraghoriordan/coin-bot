import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

import { CreateCustomBotDto, CustomBot, CustomBotApi } from "shared-api-client";
import { getAuthenticatedApiInstance } from "../../api/apiInstanceFactories";

import wellKnownQueries from "../wellKnownQueries";

type SaveOfferSubmissionMutationVariables = {
    uuid: string;
    model: CreateCustomBotDto;
};
const apiRequest = async (
    getAccessTokenSilently: () => Promise<string>,
    uuid: string,
    model: CreateCustomBotDto
): Promise<CustomBot> => {
    const apiClient = await getAuthenticatedApiInstance(
        CustomBotApi,
        getAccessTokenSilently
    );
    return apiClient.customBotControllerUpdate({
        uuid,
        updateCustomBotDto: model,
    });
};

export default function useEditBot() {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation(
        wellKnownQueries.updateCustomBot,
        async (variables: SaveOfferSubmissionMutationVariables) =>
            apiRequest(getAccessTokenSilently, variables.uuid, variables.model)
    );
}
