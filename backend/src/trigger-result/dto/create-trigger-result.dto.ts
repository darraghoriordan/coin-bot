import { ApiProperty } from "@nestjs/swagger";

export class CreateTriggerResultDto {
    @ApiProperty()
    public result!: boolean;

    @ApiProperty()
    public triggerId!: number;
}
