import { ObjectType, Field, InputType, createUnionType } from "type-graphql";
import User from "../../entities/User";

@ObjectType()
export class UserRegisterResultSuccess {
  constructor(user: User) {
    this.user = user;
  }
  @Field()
  user: User;
}

@ObjectType()
export class UserRegisterInvalidInputError implements Partial<User> {
  constructor(userRegisterInputErrors: Partial<UserRegisterInvalidInputError>) {
    Object.assign(this, userRegisterInputErrors);
    this.message = "Invalid Input Error";
  }
  @Field()
  message: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  fatherLastName?: string;

  @Field({ nullable: true })
  motherLastName?: string;

  @Field({ nullable: true })
  career?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  studentCode?: string;

  @Field({ nullable: true })
  studentNip?: string;
}
@InputType()
export class UserRegisterInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  fatherLastName: string;

  @Field()
  motherLastName: string;

  @Field()
  career: string;

  @Field()
  description: string;

  @Field()
  birthday: Date;

  @Field()
  studentCode: string;

  @Field()
  studentNip: string;
}

export const UserRegisterResult = createUnionType({
  name: "UserRegisterResult",
  types: () => [UserRegisterResultSuccess, UserRegisterInvalidInputError],
});
