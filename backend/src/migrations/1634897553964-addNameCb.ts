import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line unicorn/prevent-abbreviations
export class AddNameCb1634897553964 implements MigrationInterface {
    name = "addNameCb1634897553964";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."custom_bot" ADD "name" character varying NOT NULL DEFAULT 'Super Bot'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."custom_bot" DROP COLUMN "name"`
        );
    }
}
