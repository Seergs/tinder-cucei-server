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

@InputType()
export class UserRegisterInput {
  @Field()
  studentCode: string;

  @Field()
  studentNip: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birthday: string;

  @Field()
  career: string;

  @Field()
  description: string;

  @Field()
  gender: string;

  @Field()
  primaryImageUrl: string;

  @Field(() => [String])
  secondaryImagesUrl: string[];
}

@ObjectType()
export class UserRegisterInvalidInputError {
  constructor(errors: Partial<UserRegisterInvalidInputError>) {
    Object.assign(this, errors);
  }
  @Field({ nullable: true })
  studentCode: string;

  @Field({ nullable: true })
  studentNip: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  birthday: string;

  @Field({ nullable: true })
  career: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  campus: string;

  @Field({ nullable: true })
  credentials: string;

  @Field({ nullable: true })
  primaryImageUrl: string;
}

export const UserRegisterResult = createUnionType({
  name: "UserRegisterResult",
  types: () => [UserRegisterResultSuccess, UserRegisterInvalidInputError],
});
