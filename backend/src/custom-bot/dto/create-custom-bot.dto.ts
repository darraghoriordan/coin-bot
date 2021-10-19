import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CreateTriggerDto } from "../../trigger/dto/create-trigger.dto";

export class CreateCustomBotDto {
    @ApiProperty({ isArray: true, type: CreateTriggerDto })
    @Type(() => CreateTriggerDto)
    triggers!: CreateTriggerDto[];

    @ApiProperty()
    checkSchedule!: string;
}
