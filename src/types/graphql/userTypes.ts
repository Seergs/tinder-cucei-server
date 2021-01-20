import {
  ObjectType,
  Field,
  createUnionType,
  InputType,
  Int,
} from "type-graphql";
import { Preferences } from "../../entities/User";

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

@InputType()
export class UpdatePreferencesInput {
  @Field()
  preferedGender: string;

  @Field(() => Int)
  ageRange: number;

  @Field(() => [String])
  interests: string[];
}

@ObjectType()
export class UpdatePreferencesInputError {
  constructor(errors: Partial<UpdatePreferencesInputError>) {
    Object.assign(this, errors);
  }
  @Field({ nullable: true })
  preferedGender: string;

  @Field({ nullable: true })
  ageRange: string;

  @Field({ nullable: true })
  interests: string;
}

@ObjectType()
export class UpdatePreferencesSuccess {
  constructor(preferences: Preferences) {
    this.preferences = preferences;
  }
  @Field(() => Preferences)
  preferences: Preferences;
}

export const UpdatePreferencesResult = createUnionType({
  name: "UpdatePreferencesResult",
  types: () => [
    UpdatePreferencesInputError,
    UpdatePreferencesSuccess,
    MeResultError,
  ],
});
