import {
    ApiProperty,
    //   getSchemaPath,
} from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsDefined } from "class-validator";
import {
    AfterInsert,
    AfterLoad,
    AfterUpdate,
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
    UpdateDateColumn,
} from "typeorm";
import { CustomBot } from "../../custom-bot/entities/custom-bot.entity";
import { TriggerResult } from "../../trigger-result/entities/trigger-result.entity";
import TriggerMeta from "../trigger-types/meta.dto";
import { NoActionTestMeta } from "../trigger-types/no-action-test/meta-data";
import { TriggerTypeEnum } from "../trigger-types/TriggerTypeEnum";
import { TwitterUserMentionMeta } from "../trigger-types/twitter-user-mention/meta-data";

@Entity()
@Exclude()
export class Trigger {
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

    @Expose()
    @Column({
        type: "enum",
        enum: TriggerTypeEnum,
        default: TriggerTypeEnum.NO_ACTION_DEFAULT,
    })
    @ApiProperty({ enum: TriggerTypeEnum, enumName: "TriggerTypeEnum" })
    public triggerType!: TriggerTypeEnum;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
    @Transform((t) => t.value.triggerType.toString())
    public triggerTypeString!: string;

    @Expose()
    @ApiProperty({ type: () => TriggerResult, isArray: true })
    @Type(() => TriggerResult)
    @OneToMany(() => TriggerResult, (result) => result.trigger, {
        onDelete: "CASCADE",
    })
    triggerResults!: TriggerResult[];

    @ManyToOne(() => CustomBot, (customBot) => customBot.triggers, {
        eager: true,
        onDelete: "CASCADE",
    })
    @Index()
    @Type(() => CustomBot)
    @JoinColumn({ name: "customBotId" })
    customBot!: CustomBot;

    @Column()
    @ApiProperty()
    customBotId!: number;
    @Expose()
    @Column({ type: "jsonb" })
    @Type(
        () => TriggerMeta

        // , {
        //     keepDiscriminatorProperty: true,
        //     discriminator: {
        //         property: "triggerTypeString",
        //         subTypes: [
        //             {
        //                 value: TwitterUserMentionMeta,
        //                 name: TriggerTypeEnum.TWITTER_USER_MENTION,
        //             },
        //             {
        //                 value: NoActionTestMeta,
        //                 name: TriggerTypeEnum.NO_ACTION_DEFAULT,
        //             },
        //         ],
        //     },
        // }
    )
    @IsDefined()
    @ApiProperty()
    // @ApiProperty({
    //     oneOf: [
    //         { $ref: getSchemaPath(TwitterUserMentionMeta) },
    //         { $ref: getSchemaPath(NoActionTestMeta) },
    //     ],
    // })
    public meta!: TwitterUserMentionMeta | NoActionTestMeta;
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

    // eslint-disable-next-line @typescript-eslint/require-await
    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async nullChecks() {
        if (!this.triggerResults) {
            this.triggerResults = [];
        }
    }
}
