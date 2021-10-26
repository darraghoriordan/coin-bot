import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEnum } from "class-validator";
import { TriggerTypeEnum } from "../trigger-types/TriggerTypeEnum";
import AllMetaTypes from "../trigger-types/all-meta-types.dto";
//import TriggerMeta from "./meta.dto";

export class CreateTriggerDto {
    @IsDefined()
    @IsEnum(TriggerTypeEnum)
    @ApiProperty({ enum: TriggerTypeEnum, enumName: "TriggerTypeEnum" })
    public triggerType!: TriggerTypeEnum;

    @ApiProperty()
    @IsDefined()
    @Type(() => AllMetaTypes)
    public allMeta!: AllMetaTypes;
    // @Type(() => TriggerMeta, {
    //     discriminator: {
    //         property: "triggerType",
    //         subTypes: [
    //             {
    //                 value: TwitterUserMentionMeta,
    //                 name: TriggerTypeEnum.TWITTER_USER_MENTION,
    //             },
    //             {
    //                 value: NoActionTestMeta,
    //                 name: TriggerTypeEnum.NO_ACTION_DEFAULT,
    //             },
    //         ],
    //     },
    // })
    // @IsDefined()
    // @ApiProperty({
    //     oneOf: [
    //         { $ref: getSchemaPath(TwitterUserMentionMeta) },
    //         { $ref: getSchemaPath(NoActionTestMeta) },
    //     ],
    // })
    // public meta!: TwitterUserMentionMeta | NoActionTestMeta;
}
