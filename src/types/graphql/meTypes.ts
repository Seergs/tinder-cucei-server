import { ObjectType, Field, createUnionType } from "type-graphql";

@ObjectType()
export class MeResultSuccess {
  constructor(me: Partial<MeResultSuccess>) {
    Object.assign(this, me);
  }

  @Field()
  id: string;

  @Field()
  studentCode: string;

  @Field()
  firstName: string;
}

@ObjectType()
export class MeResultError {
  constructor(message: string) {
    this.message = message;
  }

  @Field()
  message: string;
}

export const MeResult = createUnionType({
  name: "MeResult",
  types: () => [MeResultSuccess, MeResultError],
});
