import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import Match from "../entities/Match";
import User from "../entities/User";
import View from "../entities/View";
import {
  LikeResult,
  LikeSuccess,
  UserNotFoundError,
} from "../types/graphql/likesTypes";
import { MeResultError } from "../types/graphql/userTypes";

@Resolver()
export default class LikeResolver {
  @Mutation(() => LikeResult)
  async likePerson(
    @Arg("targetUserId") targetUserId: string,
    @Ctx("user") user: User
  ): Promise<typeof LikeResult> {
    if (!user) return new MeResultError("No autentificado");

    const targetUser = await User.findOne(targetUserId);
    if (!targetUser) return new UserNotFoundError(targetUserId);

    const targetUserView = await View.findOne({
      where: {
        target: {
          id: user.id,
        },
        viewer: {
          id: targetUserId,
        },
      },
    });

    const view = new View({
      target: targetUser,
      viewer: user,
    });
    await view.save();

    let match: undefined | Match = undefined;
    if (targetUserView && targetUserView.liked) {
      const newMatch = new Match({
        userOne: user,
        userTwo: targetUser,
      });
      match = await newMatch.save();
    }

    return new LikeSuccess({
      view: view,
      match: match,
    });
  }

  @Mutation(() => LikeResult)
  async dislikePerson(
    @Arg("targetUserId") targetUserId: string,
    @Ctx("user") user: User
  ): Promise<typeof LikeResult> {
    const targetUser = await User.findOne(targetUserId);
    if (!targetUser) return new UserNotFoundError(targetUserId);

    const view = new View({
      target: targetUser,
      viewer: user,
      liked: false,
    });

    await view.save();

    return new LikeSuccess({
      view,
      match: undefined,
    });
  }
}
