import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import {
    AfterLoad,
    AfterInsert,
    AfterUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Trigger } from "../../trigger/entities/trigger.entity";
import { RunningStateEnum } from "../dto/runningStateEnum";

@Entity()
export class CustomBot {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Column("uuid", {
        name: "uuid",
        default: () => "uuid_generate_v4()",
    })
    @Generated("uuid")
    @ApiProperty()
    public uuid!: string;

    @Column()
    @ApiProperty()
    public ownerId!: string;

    @Column({
        default: "My Bot",
    })
    @ApiProperty()
    public name!: string;

    @Type(() => Trigger)
    @OneToMany(() => Trigger, (trigger) => trigger.customBot, {
        cascade: true,
    })
    @ApiProperty({ isArray: true, type: () => Trigger })
    @ValidateNested({ each: true })
    triggers!: Trigger[];

    @ApiProperty()
    @Column({
        type: "integer",
        nullable: false,
        default: 3000,
    })
    public runEveryInSeconds!: number;

    @ApiProperty()
    @Column({
        type: "timestamp with time zone",
        nullable: false,
        default: () => "CURRENT_TIMESTAMP",
    })
    public lastRun!: Date;

    @Column({
        type: "enum",
        enum: RunningStateEnum,
        default: RunningStateEnum.STOPPED,
    })
    @ApiProperty({ enum: RunningStateEnum, enumName: "RunningStateEnum" })
    public runningState!: RunningStateEnum;

    @CreateDateColumn()
    @ApiProperty()
    public createdDate!: Date;

    @UpdateDateColumn()
    @ApiProperty()
    public updateDate!: Date;

    @DeleteDateColumn()
    @ApiProperty()
    public deletedDate!: Date;

    // eslint-disable-next-line @typescript-eslint/require-await
    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async nullChecks() {
        if (!this.triggers) {
            this.triggers = [];
        }
    }
}
