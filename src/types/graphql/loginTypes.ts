import { ObjectType, Field, InputType, createUnionType } from "type-graphql";

@ObjectType()
export class UserLoginResultSuccess {
  constructor(data: Partial<UserLoginResultSuccess>) {
    Object.assign(this, data);
  }

  @Field()
  jwt: string;
}

@ObjectType()
export class UserLoginInvalidInputError {
  constructor(userLoginInputErrors: Partial<UserLoginInvalidInputError>) {
    Object.assign(this, userLoginInputErrors);
  }
  @Field({ nullable: true })
  studentCode?: string;

  @Field({ nullable: true })
  studentNip?: string;

  @Field({ nullable: true })
  credentials?: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  studentCode: string;

  @Field()
  studentNip: string;
}

export const UserLoginResult = createUnionType({
  name: "UserLoginResult",
  types: () => [UserLoginResultSuccess, UserLoginInvalidInputError],
});
