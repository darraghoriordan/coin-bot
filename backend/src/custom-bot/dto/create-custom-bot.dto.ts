import { ApiProperty } from "@nestjs/swagger";
import { CreateTriggerDto } from "../../trigger/dto/create-trigger.dto";

export class CreateCustomBotDto {
    @ApiProperty({ isArray: true, type: CreateTriggerDto })
    triggers!: CreateTriggerDto[];

    @ApiProperty()
    checkSchedule!: string;
}
