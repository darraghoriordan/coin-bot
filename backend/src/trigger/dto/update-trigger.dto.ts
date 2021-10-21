import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";
import { CreateTriggerDto } from "./create-trigger.dto";

export class UpdateTriggerDto extends CreateTriggerDto {
    @ApiProperty()
    @IsDefined()
    public id!: number;

    @ApiProperty()
    @IsDefined()
    public uuid!: string;
}
