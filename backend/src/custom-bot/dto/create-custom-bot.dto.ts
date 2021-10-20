import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateTriggerDto } from "../../trigger/dto/create-trigger.dto";
import { IsArray, IsString, MinLength } from "class-validator";
export class CreateCustomBotDto {
    @ApiProperty({ isArray: true, type: CreateTriggerDto })
    @Type(() => CreateTriggerDto)
    @IsArray()
    triggers!: CreateTriggerDto[];

    @ApiProperty()
    @IsString()
    @MinLength(1)
    checkSchedule!: string;
}
