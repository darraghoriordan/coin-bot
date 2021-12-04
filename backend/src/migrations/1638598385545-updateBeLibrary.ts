import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBeLibrary1638598385545 implements MigrationInterface {
    name = 'updateBeLibrary1638598385545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" DROP CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ALTER COLUMN "triggerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."trigger" DROP CONSTRAINT "FK_5971993f9ab591fae2076693eb5"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger" ALTER COLUMN "customBotId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ADD CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e" FOREIGN KEY ("triggerId") REFERENCES "trigger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."trigger" ADD CONSTRAINT "FK_5971993f9ab591fae2076693eb5" FOREIGN KEY ("customBotId") REFERENCES "custom_bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."trigger" DROP CONSTRAINT "FK_5971993f9ab591fae2076693eb5"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" DROP CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e"`);
        await queryRunner.query(`ALTER TABLE "public"."trigger" ALTER COLUMN "customBotId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."trigger" ADD CONSTRAINT "FK_5971993f9ab591fae2076693eb5" FOREIGN KEY ("customBotId") REFERENCES "custom_bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ALTER COLUMN "triggerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."trigger_result" ADD CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e" FOREIGN KEY ("triggerId") REFERENCES "trigger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
