import { Field, createUnionType, ObjectType } from "type-graphql";
import View from "../../entities/View";
import { MeResultError } from "./userTypes";

@ObjectType()
export class LikeSuccess {
  constructor(like: Partial<LikeSuccess>) {
    Object.assign(this, like);
  }
  @Field()
  view: View;

  @Field()
  match: boolean;
}

@ObjectType()
export class ViewNotFoundError {
  constructor(viewId: string) {
    this.message = `No se encontró View ${viewId}`;
  }
  @Field()
  message: string;
}

export const LikeResult = createUnionType({
  name: "LikeResult",
  types: () => [LikeSuccess, MeResultError, ViewNotFoundError],
});
