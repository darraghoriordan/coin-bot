import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    IsDate,
    IsDefined,
    IsString,
    MinLength,
    NotContains,
} from "class-validator";

export class TwitterTestQueryDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    @NotContains("@")
    twitterName!: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    query!: string;

    @IsDate()
    @IsDefined()
    @ApiProperty()
    @Type(() => Date)
    public since!: Date;
}
