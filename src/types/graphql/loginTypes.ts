import { ObjectType, Field, InputType, createUnionType } from "type-graphql";
import User from "../../entities/User";

@ObjectType()
export class UserLoginResultSuccess {
  constructor(user: User) {
    this.user = user;
  }
  @Field()
  user: User;
}

@ObjectType()
export class UserLoginInvalidInputError {
  constructor(userLoginInputErrors: Partial<UserLoginInvalidInputError>) {
    Object.assign(this, userLoginInputErrors);
    this.message = "Invalid Input Error";
  }
  @Field()
  message: string;

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
