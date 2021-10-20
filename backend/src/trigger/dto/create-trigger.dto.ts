import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsEnum, IsString } from "class-validator";
import { TriggerTypeEnum } from "../entities/TriggerTypeEnum";
import TriggerMeta from "./meta.dto";

export class CreateTriggerDto {
    @ApiProperty()
    @IsString()
    public updateSchedule!: string;

    @IsEnum(TriggerTypeEnum)
    @ApiProperty({ enum: TriggerTypeEnum, enumName: "TriggerTypeEnum" })
    public triggerType!: TriggerTypeEnum;

    //eslint-disable-next-line @typescript-eslint/no-unsafe-return
    @Type(() => TriggerMeta)
    @IsDefined()
    @Transform(({ value }) => JSON.parse(value) as TriggerMeta, {
        toClassOnly: true,
    })
    @ApiProperty({ type: TriggerMeta })
    // eslint-disable-next-line @typescript-eslint/ban-types
    public meta!: TriggerMeta;
}
