import { ApiProperty } from "@nestjs/swagger";
import {
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

    @OneToMany(() => Trigger, (trigger) => trigger.customBot, {
        cascade: true,
    })
    @ApiProperty({ isArray: true, type: Trigger })
    triggers!: Trigger[];

    @ApiProperty()
    public checkSchedule!: string;

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
