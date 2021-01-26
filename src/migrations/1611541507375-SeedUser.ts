import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import users from "../seed";

export class SeedUser1611541507375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("users").save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
