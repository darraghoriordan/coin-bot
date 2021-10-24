import {MigrationInterface, QueryRunner} from "typeorm";

export class fixModels1635055895331 implements MigrationInterface {
    name = 'fixModels1635055895331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."trigger" DROP COLUMN "updateSchedule"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ADD "errorState" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ADD "errorMessage" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" ADD "runEveryInSeconds" integer NOT NULL DEFAULT '3000'`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" ADD "lastRun" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."custom_bot_runningstate_enum" AS ENUM('STARTED', 'STOPPED')`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" ADD "runningState" "public"."custom_bot_runningstate_enum" NOT NULL DEFAULT 'STOPPED'`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ALTER COLUMN "result" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" ALTER COLUMN "name" SET DEFAULT 'My Bot'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" ALTER COLUMN "name" SET DEFAULT 'Super Bot'`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ALTER COLUMN "result" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" DROP COLUMN "runningState"`);
        await queryRunner.query(`DROP TYPE "public"."custom_bot_runningstate_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" DROP COLUMN "lastRun"`);
        await queryRunner.query(`ALTER TABLE "public"."custom_bot" DROP COLUMN "runEveryInSeconds"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" DROP COLUMN "errorMessage"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" DROP COLUMN "errorState"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger" ADD "updateSchedule" character varying NOT NULL`);
    }

}
