import { ApiProperty } from "@nestjs/swagger";

export class TwitterUserMentionMeta {
    @ApiProperty()
    public twitterUserName!: string;
    @ApiProperty()
    public mentionText!: string;
    @ApiProperty()
    public inLastSeconds!: number;
}
