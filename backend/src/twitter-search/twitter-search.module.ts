import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TwitterClientController } from "./twitter-client.controller";
import { TwitterClientProvider } from "./twitter-client.provider";
import { TwitterSearchService } from "./twitter-search.service";
import { TwitterConfigurationService } from "./TwitterConfigurationService";
import configVariables from "./TwitterConfigurationVariables";

@Module({
    imports: [ConfigModule.forFeature(configVariables)],
    controllers: [TwitterClientController],
    providers: [
        TwitterConfigurationService,
        TwitterSearchService,
        TwitterClientProvider,
    ],
    exports: [TwitterSearchService],
})
export class TwitterSearchModule {}
