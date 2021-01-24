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
import { getAgeFromDateOfBirth } from "../util/utils";

@Resolver()
class PeopleResolver {
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

    // This queries for random users that the current user has not seen yet
    // They must be in the age range

    const query = `SELECT
                      u.id, career, birthday, "firstName", "lastName", "primaryImageUrl", "secondaryImagesUrl"
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

    const users: User[] = await manager.query(query);

    const profiles: Person[] = await Promise.all(
      users.map(async (u) => {
        const view = await View.insert({
          viewer: dbUser,
          target: u,
        });

        return {
          lastName: u.lastName,
          id: u.id,
          firstName: u.firstName,
          birthday: u.birthday,
          career: u.career,
          age: getAgeFromDateOfBirth(u.birthday),
          primaryImageUrl: u.primaryImageUrl,
          secondaryImagesUrl: u.secondaryImagesUrl,
          viewId: view.raw[0].id,
        };
      })
    );

    return new PeopleSuccess({
      people: profiles,
    });
  }
}
export default PeopleResolver;
