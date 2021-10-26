import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidToUsers1634633416565 implements MigrationInterface {
    name = "addUuidToUsers1634633416565";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."person" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
        );
        await queryRunner.query(
            `ALTER TABLE "public"."organisation" ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."organisation" DROP COLUMN "uuid"`
        );
        await queryRunner.query(
            `ALTER TABLE "public"."person" DROP COLUMN "uuid"`
        );
    }
}
