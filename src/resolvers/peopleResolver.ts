import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import User from "../entities/User";

@Resolver()
export default class PeopleResolver {
  @Query(() => [User])
  async people(
    @Arg("limit") limit: number,
    @Ctx("user") user: Partial<User>
  ): Promise<User[]> {
    if (!user) {
    }

    const manager = getManager();

    const dbUser = await User.findOne(user.id);
    const userPreferences = dbUser?.preferences;

    const select = `select * from users`;
    const gender = ` where gender='${userPreferences?.preferedGender}'`;
    const inAgeRange = ` and ${userPreferences?.minAge} <= date_part('year', age(birthday)) 
                          and ${userPreferences?.maxAge} >= date_part('year', age(birthday))`;
    const notMe = ` and id <> '${user.id}'`;
    const order = ` order by random() limit ${limit}`;

    const query = `${select}${gender}${inAgeRange}${notMe}${order}`;

    const profiles: User[] = await manager.query(query);

    return profiles;
  }
}
