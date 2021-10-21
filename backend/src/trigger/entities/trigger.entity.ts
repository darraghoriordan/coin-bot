import {
    ApiProperty,
    ApiPropertyOptional,
    //   getSchemaPath,
} from "@nestjs/swagger";
import { Exclude, Type } from "class-transformer";
import { IsDefined } from "class-validator";
import {
    AfterLoad,
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
import TriggerMeta from "../trigger-types/meta.dto";
import { NoActionTestMeta } from "../trigger-types/no-action-test/meta-data";
import { TriggerTypeEnum } from "../trigger-types/TriggerTypeEnum";
import { TwitterUserMentionMeta } from "../trigger-types/twitter-user-mention/meta-data";

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

    @ApiPropertyOptional({ type: () => TriggerResult, isArray: true })
    @Type(() => TriggerResult)
    @OneToMany(() => TriggerResult, (result) => result.trigger, {
        cascade: true,
    })
    triggerResults?: TriggerResult[];

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
    @Type(() => TriggerMeta, {
        discriminator: {
            property: "triggerType",
            subTypes: [
                {
                    value: TwitterUserMentionMeta,
                    name: TriggerTypeEnum.TWITTER_USER_MENTION,
                },
                {
                    value: NoActionTestMeta,
                    name: TriggerTypeEnum.NO_ACTION_DEFAULT,
                },
            ],
        },
    })
    @IsDefined()
    @ApiProperty()
    // @ApiProperty({
    //     oneOf: [
    //         { $ref: getSchemaPath(TwitterUserMentionMeta) },
    //         { $ref: getSchemaPath(NoActionTestMeta) },
    //     ],
    // })
    public meta!: TwitterUserMentionMeta | NoActionTestMeta;

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
        if (!this.triggerResults) {
            this.triggerResults = [];
        }
    }
}
