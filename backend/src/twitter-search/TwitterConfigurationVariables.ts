import { registerAs } from "@nestjs/config";

export default registerAs("twitter", () => ({
    appBearerToken: process.env.TWITTER_APP_BEARER_TOKEN,
}));
