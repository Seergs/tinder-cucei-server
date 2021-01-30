import { Resolver, Mutation, Query, Ctx } from "type-graphql";
import Match from "../entities/Match";
import User from "../entities/User";

@Resolver()
export default class MatchResolver {
  @Query(() => [Match], { nullable: true })
  async matches(@Ctx("user") user: User) {
    const matches = await Match.find({
      where: [
        {
          userOne: user,
        },
        { userTwo: user },
      ],
    });
    return matches;
  }
}
