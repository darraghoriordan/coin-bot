import {MigrationInterface, QueryRunner} from "typeorm";

export class test1636627884546 implements MigrationInterface {
    name = 'test1636627884546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trigger_result" DROP CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e"`);
        await queryRunner.query(`ALTER TABLE "trigger_result" ALTER COLUMN "triggerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "FK_5971993f9ab591fae2076693eb5"`);
        await queryRunner.query(`ALTER TABLE "trigger" ALTER COLUMN "customBotId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trigger_result" ADD CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e" FOREIGN KEY ("triggerId") REFERENCES "trigger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "FK_5971993f9ab591fae2076693eb5" FOREIGN KEY ("customBotId") REFERENCES "custom_bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trigger" DROP CONSTRAINT "FK_5971993f9ab591fae2076693eb5"`);
        await queryRunner.query(`ALTER TABLE "trigger_result" DROP CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e"`);
        await queryRunner.query(`ALTER TABLE "trigger" ALTER COLUMN "customBotId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trigger" ADD CONSTRAINT "FK_5971993f9ab591fae2076693eb5" FOREIGN KEY ("customBotId") REFERENCES "custom_bot"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trigger_result" ALTER COLUMN "triggerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trigger_result" ADD CONSTRAINT "FK_1e1a9c3d0813a03b847fad1809e" FOREIGN KEY ("triggerId") REFERENCES "trigger"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
