import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined } from "class-validator";
import AllMetaTypes from "../trigger-types/all-meta-types.dto";

export class UpdateTriggerDto {
    @ApiProperty()
    @IsDefined()
    public id!: number;

    @ApiProperty()
    @IsDefined()
    public uuid!: string;

    @ApiProperty()
    @IsDefined()
    @Type(() => AllMetaTypes)
    public allMeta!: AllMetaTypes;
}
