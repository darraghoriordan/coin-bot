import { MigrationInterface, QueryRunner } from "typeorm";

export class TriggerResultReason1639981463753 implements MigrationInterface {
    name = "triggerResultReason1639981463753";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."trigger_result" ADD "reason" text`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."trigger_result" DROP COLUMN "reason"`
        );
    }
}
