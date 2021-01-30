import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import User from "../entities/User";
import { users } from "../seed";

export class SeedUser1611541507375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("users").save(users);

    const savedUsers = (await getRepository("users").find()) as User[];
    const targetId = "5df62c25-5a40-4503-a459-2624c257f15c";
    const target = await getRepository("users").findOne(targetId);

    const views: any = [];
    savedUsers.map((user, i) => {
      if (i % 5 === 0 && user.id !== targetId) {
        views.push({
          viewer: user,
          target,
        });
      }
    });

    await getRepository("views").save(views);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
