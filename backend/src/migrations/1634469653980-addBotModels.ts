import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBotModels1634469653980 implements MigrationInterface {
    name = "addBotModels1634469653980";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "trigger_result" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "result" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "triggerId" integer, CONSTRAINT "PK_d11a5126093bd011781b80bc2ac" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_1e1a9c3d0813a03b847fad1809" ON "trigger_result" ("triggerId") `
        );
        await queryRunner.query(
            `CREATE TYPE "trigger_triggertype_enum" AS ENUM('TWITTER_USER_MENTION', 'NO_ACTION_DEFAULT')`
        );
        await queryRunner.query(
            `CREATE TABLE "trigger" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "updateSchedule" character varying NOT NULL, "triggerType" "trigger_triggertype_enum" NOT NULL DEFAULT 'NO_ACTION_DEFAULT', "meta" jsonb NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "customBotId" integer, CONSTRAINT "PK_fc6b3cbbe199d89c002831e03e8" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_5971993f9ab591fae2076693eb" ON "trigger" ("customBotId") `
        );
        await queryRunner.query(
            `CREATE TABLE "custom_bot" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_756131ef3d0502834670ac40cae" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "trigger_result" ADD CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e" FOREIGN KEY ("triggerId") REFERENCES "trigger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "trigger" ADD CONSTRAINT "FK_5971993f9ab591fae2076693eb5" FOREIGN KEY ("customBotId") REFERENCES "custom_bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "trigger" DROP CONSTRAINT "FK_5971993f9ab591fae2076693eb5"`
        );
        await queryRunner.query(
            `ALTER TABLE "trigger_result" DROP CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e"`
        );
        await queryRunner.query(`DROP TABLE "custom_bot"`);
        await queryRunner.query(`DROP INDEX "IDX_5971993f9ab591fae2076693eb"`);
        await queryRunner.query(`DROP TABLE "trigger"`);
        await queryRunner.query(`DROP TYPE "trigger_triggertype_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_1e1a9c3d0813a03b847fad1809"`);
        await queryRunner.query(`DROP TABLE "trigger_result"`);
    }
}
