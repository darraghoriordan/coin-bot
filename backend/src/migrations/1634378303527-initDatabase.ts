import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1634378303527 implements MigrationInterface {
    name = "initDatabase1634378303527";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "email" ("id" SERIAL NOT NULL, "ownerId" character varying NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "to" character varying NOT NULL, "body" character varying NOT NULL, "subject" character varying NOT NULL, "sentDate" TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_app_email_id" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_69281e5c9fd2818a066d09f663" ON "email" ("ownerId") `
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "blocked" boolean NOT NULL DEFAULT false, "name" character varying, "familyName" character varying, "givenName" character varying, "picture" character varying NOT NULL, "auth0UserId" character varying NOT NULL, "username" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_app_person_id" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_ecad84c0c56a504ca839b06b85" ON "person" ("auth0UserId") `
        );
        await queryRunner.query(
            `CREATE TABLE "organisation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "ownerId" integer, CONSTRAINT "PK_app_org_id" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_d8df3e440ba45237db29bae763" ON "organisation" ("ownerId") `
        );
        await queryRunner.query(
            `CREATE TABLE "organisation_members_person" ("organisationId" integer NOT NULL, "personId" integer NOT NULL, CONSTRAINT "PK_app_omp_id" PRIMARY KEY ("organisationId", "personId"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_6cd45c46742d0e35314f109b61" ON "organisation_members_person" ("organisationId") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_45326dfcd3b4a291247636a77b" ON "organisation_members_person" ("personId") `
        );
        await queryRunner.query(
            `ALTER TABLE "organisation" ADD CONSTRAINT "FK_d8df3e440ba45237db29bae7631" FOREIGN KEY ("ownerId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_members_person" ADD CONSTRAINT "FK_6cd45c46742d0e35314f109b61b" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_members_person" ADD CONSTRAINT "FK_45326dfcd3b4a291247636a77bf" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_members_person" DROP CONSTRAINT "FK_45326dfcd3b4a291247636a77bf"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_members_person" DROP CONSTRAINT "FK_6cd45c46742d0e35314f109b61b"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation" DROP CONSTRAINT "FK_d8df3e440ba45237db29bae7631"`
        );
        await queryRunner.query(`DROP INDEX "IDX_45326dfcd3b4a291247636a77b"`);
        await queryRunner.query(`DROP INDEX "IDX_6cd45c46742d0e35314f109b61"`);
        await queryRunner.query(`DROP TABLE "organisation_members_person"`);
        await queryRunner.query(`DROP INDEX "IDX_d8df3e440ba45237db29bae763"`);
        await queryRunner.query(`DROP TABLE "organisation"`);
        await queryRunner.query(`DROP INDEX "IDX_ecad84c0c56a504ca839b06b85"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP INDEX "IDX_69281e5c9fd2818a066d09f663"`);
        await queryRunner.query(`DROP TABLE "email"`);
    }
}
