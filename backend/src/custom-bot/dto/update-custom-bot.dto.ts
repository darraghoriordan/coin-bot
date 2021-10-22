import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength } from "class-validator";

export class UpdateCustomBotDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    name!: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    checkSchedule!: string;
}
