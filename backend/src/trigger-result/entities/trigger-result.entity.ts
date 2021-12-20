import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
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
    UpdateDateColumn,
} from "typeorm";
import { Trigger } from "../../trigger/entities/trigger.entity";

@Entity()
@Exclude()
export class TriggerResult {
    @Expose()
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id!: number;

    @Expose()
    @Column("uuid", {
        name: "uuid",
        default: () => "uuid_generate_v4()",
    })
    @Generated("uuid")
    @ApiProperty()
    public uuid!: string;

    @Column({
        type: "boolean",
        default: false,
    })
    @ApiProperty()
    @Expose()
    public result!: boolean;

    @Column({
        type: "text",
        nullable: true,
    })
    @ApiPropertyOptional()
    @Expose()
    public reason?: string;

    @Expose()
    @Column({
        type: "boolean",
        default: false,
    })
    @ApiProperty()
    public errorState!: boolean;

    @Expose()
    @Column({ nullable: true })
    @ApiPropertyOptional()
    public errorMessage?: string;

    @ManyToOne(() => Trigger, (trigger) => trigger.triggerResults, {
        eager: true,
        onDelete: "CASCADE",
    })
    @Index()
    @Type(() => Trigger)
    @JoinColumn({ name: "triggerId" })
    trigger!: Trigger;

    @Expose()
    @Column()
    @ApiProperty()
    triggerId!: number;

    @Expose()
    @CreateDateColumn()
    @ApiProperty()
    public createdDate!: Date;

    @Expose()
    @UpdateDateColumn()
    @ApiProperty()
    public updateDate!: Date;

    @Expose()
    @DeleteDateColumn()
    @ApiProperty()
    public deletedDate!: Date;
}
