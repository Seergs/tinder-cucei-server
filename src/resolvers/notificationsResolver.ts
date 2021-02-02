import { Resolver, Mutation, Ctx, Arg } from "type-graphql";
import User from "../entities/User";

@Resolver()
export default class NotificationResolver {
  @Mutation(() => Boolean)
  async setExpoPushToken(
    @Arg("token") token: string,
    @Ctx("user") user: User
  ): Promise<boolean> {
    if (!user) return false;

    await User.update(user.id, { expoPushToken: token });
    return true;
  }
}
