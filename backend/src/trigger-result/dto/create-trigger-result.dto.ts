import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTriggerResultDto {
    @ApiProperty()
    public result!: boolean;

    @ApiProperty()
    public errorState!: boolean;

    @ApiPropertyOptional()
    public errorMessage?: string;

    @ApiProperty()
    public triggerId!: number;
}
