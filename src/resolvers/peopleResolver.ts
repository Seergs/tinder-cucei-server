import { Arg, Ctx, Query, Resolver, Int } from "type-graphql";
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
class PeopleResolver {
  @Query(() => PeopleResult)
  async people(
    @Arg("limit", () => Int) limit: number,
    @Ctx("user") user: Partial<User>
  ): Promise<typeof PeopleResult> {
    if (!user) {
      return new MeResultError("No autenticado");
    }

    const manager = getManager();

    const dbUser = await User.findOne(user.id);
    const userPreferences = dbUser?.preferences;

    // This queries for random users that the current user has not seen yet
    // They must be in the age range

    const query = `SELECT
                      u.id, career, birthday, "firstName", "lastName", "primaryImageUrl", "secondaryImagesUrl", "preferencesInterests" as interests
                   FROM 
                      users u
                   LEFT JOIN
                      views v
                      ON v."viewerId" = '${user.id}'
                      AND v."targetId" = u.id
                    WHERE v is NULL
                    AND gender='${userPreferences?.preferedGender}'
                    AND ${userPreferences?.minAge} <= date_part('year', age(birthday))
                    AND ${userPreferences?.maxAge} >= date_part('year', age(birthday))
                    AND u.id <> '${user.id}'
                    ORDER BY RANDOM() limit ${limit}
                   `;

    const users: Person[] = await manager.query(query);

    return new PeopleSuccess({ people: users });
  }
}
export default PeopleResolver;
