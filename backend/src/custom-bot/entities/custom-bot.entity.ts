import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import {
    AfterLoad,
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

    @Column()
    @ApiProperty()
    public ownerId!: string;

    @Type(() => Trigger)
    @OneToMany(() => Trigger, (trigger) => trigger.customBot, {
        cascade: true,
    })
    @ApiProperty({ isArray: true, type: () => Trigger })
    @ValidateNested({ each: true })
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

    // eslint-disable-next-line @typescript-eslint/require-await
    @AfterLoad()
    async nullChecks() {
        if (!this.triggers) {
            this.triggers = [];
        }
    }
}
