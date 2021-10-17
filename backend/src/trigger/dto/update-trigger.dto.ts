import { ApiProperty } from "@nestjs/swagger";
import { CreateTriggerDto } from "./create-trigger.dto";

export class UpdateTriggerDto extends CreateTriggerDto {
    @ApiProperty()
    public id!: number;

    @ApiProperty()
    public uuid!: string;
}
