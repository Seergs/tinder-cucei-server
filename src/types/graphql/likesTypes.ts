import { Field, createUnionType, ObjectType } from "type-graphql";
import Match from "../../entities/Match";
import View from "../../entities/View";
import { MeResultError } from "./userTypes";

@ObjectType()
export class LikeSuccess {
  constructor(like: Partial<LikeSuccess>) {
    Object.assign(this, like);
  }
  @Field()
  view: View;

  @Field({ nullable: true })
  match: Match;
}

@ObjectType()
export class UserNotFoundError {
  constructor(userId: string) {
    this.message = `No se encontró el usuario ${userId}`;
  }
  @Field()
  message: string;
}

export const LikeResult = createUnionType({
  name: "LikeResult",
  types: () => [LikeSuccess, MeResultError, UserNotFoundError],
});
