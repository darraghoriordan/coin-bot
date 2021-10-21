import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateTriggerDto } from "../../trigger/dto/create-trigger.dto";
import {
    ArrayMinSize,
    IsArray,
    IsDefined,
    IsString,
    MinLength,
    ValidateNested,
} from "class-validator";
export class CreateCustomBotDto {
    @ApiProperty({ isArray: true, type: CreateTriggerDto })
    @Type(() => CreateTriggerDto)
    @IsArray()
    @IsDefined()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    triggers!: CreateTriggerDto[];

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    checkSchedule!: string;
}
