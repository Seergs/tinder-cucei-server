import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import User from "../entities/User";
import View from "../entities/View";
import {
  PeopleResult,
  PeopleSuccess,
  Person,
} from "../types/graphql/peopleTypes";
import { MeResultError } from "../types/graphql/userTypes";

@Resolver()
export default class PeopleResolver {
  @Query(() => PeopleResult)
  async people(
    @Arg("limit") limit: number,
    @Ctx("user") user: Partial<User>
  ): Promise<typeof PeopleResult> {
    if (!user) {
      return new MeResultError("No autenticado");
    }

    const manager = getManager();

    const dbUser = await User.findOne(user.id);
    const userPreferences = dbUser?.preferences;

    const select = `select id, career, birthday, "firstName", "lastName", "primaryImageUrl", "secondaryImagesUrl" from users`;
    const gender = ` where gender='${userPreferences?.preferedGender}'`;
    const inAgeRange = ` and ${userPreferences?.minAge} <= date_part('year', age(birthday)) 
                          and ${userPreferences?.maxAge} >= date_part('year', age(birthday))`;
    const notMe = ` and id <> '${user.id}'`;
    const order = ` order by random() limit ${limit}`;

    const query = `${select}${gender}${inAgeRange}${notMe}${order}`;

    const people: Person[] = await manager.query(query);

    people.map(async (p) => {
      const view = await View.insert({
        viewer: dbUser,
        target: p,
      });
      p.viewId = view.raw[0].id;
    });

    return new PeopleSuccess({
      people,
    });
  }
}
