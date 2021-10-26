import { ApiProperty } from "@nestjs/swagger";
import TriggerMeta from "../meta.dto";

export class TwitterUserMentionMeta extends TriggerMeta {
    @ApiProperty()
    public twitterUserName!: string;
    @ApiProperty()
    public mentionText!: string;
}
