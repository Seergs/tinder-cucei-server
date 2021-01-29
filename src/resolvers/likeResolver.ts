import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import User from "../entities/User";
import View from "../entities/View";
import {
  LikeResult,
  LikeSuccess,
  ViewNotFoundError,
} from "../types/graphql/likesTypes";
import { MeResultError } from "../types/graphql/userTypes";

@Resolver()
export default class LikeResolver {
  @Mutation(() => LikeResult)
  async likePerson(
    @Arg("viewId") viewId: string,
    @Ctx("user") user: Partial<User>
  ): Promise<typeof LikeResult> {
    if (!user) {
      return new MeResultError("No autenticado");
    }

    // Current users view
    const view = await View.findOne({
      where: { id: viewId },
    });

    if (!view) return new ViewNotFoundError(viewId);

    // Like
    view.liked = true;
    await View.update({ id: viewId }, { liked: true });

    // Checking if a the target user liked the current user
    const targetView = await View.findOne({
      where: {
        target: {
          id: user.id,
        },
        viewer: {
          id: view.target.id,
        },
      },
    });

    // Not like back
    if (!targetView || !targetView.liked) {
      return new LikeSuccess({ view, match: false });
    }

    // Its a match
    return new LikeSuccess({
      view,
      match: true,
    });
  }
}
