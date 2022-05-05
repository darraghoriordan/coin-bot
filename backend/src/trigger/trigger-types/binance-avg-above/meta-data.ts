import { ApiProperty } from "@nestjs/swagger";
import TriggerMeta from "../meta.dto";

export class BinanceAverageAboveMeta extends TriggerMeta {
    @ApiProperty()
    public binanceSymbol!: string;

    @ApiProperty()
    public aboveLimit!: number;
}
