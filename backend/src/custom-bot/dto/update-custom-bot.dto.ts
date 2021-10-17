import { ApiProperty } from "@nestjs/swagger";
import { UpdateTriggerDto } from "../../trigger/dto/update-trigger.dto";

export class UpdateCustomBotDto {
    @ApiProperty({ isArray: true, type: UpdateTriggerDto })
    triggers!: UpdateTriggerDto[];

    @ApiProperty()
    checkSchedule!: string;
}
