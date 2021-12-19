import TwitterApi from "twitter-api-v2";
import { TwitterConfigurationService } from "./TwitterConfigurationService";

export const TwitterClientProvider = {
    provide: TwitterApi,
    useFactory: (config: TwitterConfigurationService) => {
        return new TwitterApi(config.appBearerToken);
    },
    inject: [TwitterConfigurationService],
};
