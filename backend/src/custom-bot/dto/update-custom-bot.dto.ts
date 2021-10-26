import { ApiProperty } from "@nestjs/swagger";
import {
    IsDefined,
    IsEnum,
    IsString,
    MinLength,
    IsInt,
    Min,
    Max,
} from "class-validator";
import { RunningStateEnum } from "./runningStateEnum";

export class UpdateCustomBotDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    name!: string;

    @ApiProperty()
    @IsDefined()
    @IsInt()
    @Min(600)
    @Max(86_400)
    runEveryInSeconds!: number;

    @IsEnum(RunningStateEnum)
    @IsDefined()
    @ApiProperty({ enum: RunningStateEnum, enumName: "RunningStateEnum" })
    public runningState!: RunningStateEnum;
}
