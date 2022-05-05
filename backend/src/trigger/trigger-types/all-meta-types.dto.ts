import { ApiPropertyOptional } from "@nestjs/swagger";
import { BinanceAverageAboveMeta } from "./binance-avg-above/meta-data";
import { NoActionTestMeta } from "./no-action-test/meta-data";
import { TwitterUserMentionMeta } from "./twitter-user-mention/meta-data";

export default class AllMetaTypes {
    @ApiPropertyOptional()
    public twitterUserMentionMeta?: TwitterUserMentionMeta;

    @ApiPropertyOptional()
    public noActionTestMeta?: NoActionTestMeta;

    @ApiPropertyOptional()
    public binanceAboveAverageMeta?: BinanceAverageAboveMeta;
}
