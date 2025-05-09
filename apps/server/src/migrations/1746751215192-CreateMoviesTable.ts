import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMoviesTable1746751215192 implements MigrationInterface {
    name = 'CreateMoviesTable1746751215192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "original_title" character varying NOT NULL, "description" text NOT NULL, "tagline" text, "popularity" numeric(10,2) NOT NULL DEFAULT '0', "voteCount" integer NOT NULL DEFAULT '0', "voteAverage" numeric(5,2) NOT NULL DEFAULT '0', "releaseDate" date NOT NULL, "duration" integer NOT NULL, "status" character varying NOT NULL, "language" character varying NOT NULL, "budget" numeric(15,2) NOT NULL, "revenue" numeric(15,2) NOT NULL, "genres" character varying array NOT NULL, "coverImageUrl" character varying, "trailerUrl" character varying, "notified" character varying NOT NULL DEFAULT false, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
