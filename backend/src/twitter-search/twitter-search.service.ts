import { CoreLoggerService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { TweetV2, TwitterApi } from "twitter-api-v2";

@Injectable()
export class TwitterSearchService {
    constructor(
        private readonly twitterClient: TwitterApi,
        private readonly logger: CoreLoggerService
    ) {}

    async findAll(
        twitterName: string,
        query: string,
        since: Date
    ): Promise<TweetV2[]> {
        const queryString = `from:${twitterName} "${query}"`;

        this.logger.debug("searching for", { queryString, since });
        const twitterResults = await this.twitterClient.v2.search(
            queryString,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            { "tweet.fields": "created_at,id,text" }
        );
        this.logger.debug("raw twitter results", { twitterResults });

        const filteredResults: TweetV2[] = [];

        // todo check the next page also
        for (const tr of twitterResults) {
            if (tr.created_at && new Date(tr.created_at) > since) {
                filteredResults.push(tr);
            }
        }
        this.logger.debug("filtered results", { filteredResults });

        return filteredResults;
    }
}
