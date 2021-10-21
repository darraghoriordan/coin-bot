import { ApiProperty } from "@nestjs/swagger";
import TriggerMeta from "../meta.dto";

export class NoActionTestMeta extends TriggerMeta {
    @ApiProperty()
    public testString!: string;
}
