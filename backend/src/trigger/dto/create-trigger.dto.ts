import { ApiProperty } from "@nestjs/swagger";
import { TriggerTypeEnum } from "../entities/TriggerTypeEnum";

export class CreateTriggerDto {
    @ApiProperty()
    public updateSchedule!: string;

    @ApiProperty({ enum: TriggerTypeEnum, enumName: "TriggerTypeEnum" })
    public triggerType!: TriggerTypeEnum;

    @ApiProperty({ type: Object })
    public meta!: Record<string, unknown>;
}
