import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { UpdateTriggerDto } from "../../trigger/dto/update-trigger.dto";

export class UpdateCustomBotDto {
    @ApiProperty({ isArray: true, type: UpdateTriggerDto })
    @Type(() => UpdateTriggerDto)
    triggers!: UpdateTriggerDto[];

    @ApiProperty()
    checkSchedule!: string;
}
