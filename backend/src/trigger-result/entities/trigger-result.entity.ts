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
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from "typeorm";
import { Trigger } from "../../trigger/entities/trigger.entity";

@Entity()
export class TriggerResult {
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
    public result!: boolean;

    @Exclude()
    @ManyToOne(() => Trigger, (trigger) => trigger.triggerResults, {
        eager: true,
        onDelete: "CASCADE",
    })
    @Index()
    @Type(() => Trigger)
    @ApiProperty({ type: () => Trigger })
    @JoinColumn()
    trigger!: Trigger;

    @RelationId((triggerResult: TriggerResult) => triggerResult.trigger)
    @ApiProperty()
    triggerId!: number;

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
