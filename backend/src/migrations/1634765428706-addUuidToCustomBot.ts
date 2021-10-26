import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidToCustomBot1634765428706 implements MigrationInterface {
    name = "addUuidToCustomBot1634765428706";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."custom_bot" ADD "ownerId" character varying NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."custom_bot" DROP COLUMN "ownerId"`
        );
    }
}
