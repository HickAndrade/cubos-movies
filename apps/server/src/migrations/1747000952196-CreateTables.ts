import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1747000952196 implements MigrationInterface {
    name = 'CreateTables1747000952196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "original_title" character varying NOT NULL, "description" text NOT NULL, "tagline" text, "popularity" numeric(10,2) NOT NULL DEFAULT '0', "voteCount" integer NOT NULL DEFAULT '0', "voteAverage" numeric(5,2) NOT NULL DEFAULT '0', "releaseDate" date NOT NULL, "duration" integer NOT NULL, "status" character varying NOT NULL, "language" character varying NOT NULL, "budget" numeric(15,2) NOT NULL, "revenue" numeric(15,2) NOT NULL, "genres" character varying array NOT NULL DEFAULT '{}', "coverImageUrl" character varying, "trailerUrl" character varying, "notified" character varying NOT NULL DEFAULT false, "userId" uuid NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies" ADD CONSTRAINT "FK_64a78407424745d6c053e93cc36" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP CONSTRAINT "FK_64a78407424745d6c053e93cc36"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
