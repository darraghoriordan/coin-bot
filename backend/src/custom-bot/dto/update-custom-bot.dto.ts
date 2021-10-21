import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsDefined,
    IsString,
    MinLength,
    ValidateNested,
} from "class-validator";
import { UpdateTriggerDto } from "../../trigger/dto/update-trigger.dto";

export class UpdateCustomBotDto {
    @ApiProperty({ isArray: true, type: UpdateTriggerDto })
    @Type(() => UpdateTriggerDto)
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    triggers!: UpdateTriggerDto[];

    @ApiProperty()
    @IsDefined()
    @IsString()
    @MinLength(1)
    checkSchedule!: string;
}
