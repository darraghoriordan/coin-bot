import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from "typeorm";
import { CustomBot } from "../../custom-bot/entities/custom-bot.entity";
import { TriggerResult } from "../../trigger-result/entities/trigger-result.entity";
import { TriggerTypeEnum } from "./TriggerTypeEnum";

@Entity()
export class Trigger {
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
    public updateSchedule!: string;

    @Column({
        type: "enum",
        enum: TriggerTypeEnum,
        default: TriggerTypeEnum.NO_ACTION_DEFAULT,
    })
    @ApiProperty({ enum: TriggerTypeEnum, enumName: "TriggerTypeEnum" })
    public triggerType!: TriggerTypeEnum;

    @ApiProperty({ type: () => TriggerResult, isArray: true })
    @Type(() => TriggerResult)
    @OneToMany(() => TriggerResult, (result) => result.trigger, {
        cascade: true,
    })
    triggerResults!: TriggerResult[];

    @Exclude()
    @ManyToOne(() => CustomBot, (customBot) => customBot.triggers, {
        eager: true,
        onDelete: "CASCADE",
    })
    @Index()
    @Type(() => CustomBot)
    @JoinColumn()
    customBot!: CustomBot;

    @RelationId((trigger: Trigger) => trigger.customBot)
    @ApiProperty()
    customBotId!: number;

    @Column({ type: "jsonb" })
    @Type(() => Object)
    @ApiProperty({ type: Object })
    public meta!: Record<string, unknown>;

    @CreateDateColumn()
    @ApiProperty()
    public createdDate!: Date;

    @UpdateDateColumn()
    @ApiProperty()
    public updateDate!: Date;

    @DeleteDateColumn()
    @ApiProperty()
    public deletedDate!: Date;
}
