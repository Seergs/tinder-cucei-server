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

  @Field(() => Preferences)
  preferences: Preferences;
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
  minAge: number;

  @Field(() => Int)
  maxAge: number;

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
  minAge: string;

  @Field({ nullable: true })
  maxAge: string;

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

@InputType()
export class UpdateProfileInput {
  constructor(profile: Partial<UpdateProfileInput>) {
    Object.assign(this, profile);
  }
  @Field()
  primaryImageUrl: string;

  @Field(() => [String])
  secondaryImagesUrl: string[];

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  career: string;

  @Field()
  description: string;
}

@ObjectType()
export class UpdateProfileInputError {
  constructor(errors: Partial<UpdateProfileInputError>) {
    Object.assign(this, errors);
  }
  @Field({ nullable: true })
  primaryImageUrl: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  career: string;

  @Field({ nullable: true })
  description: string;
}

@ObjectType()
export class UpdateProfileSuccess {
  constructor() {
    this.updated = true;
  }
  @Field()
  updated: boolean;
}

export const UpdateProfileResult = createUnionType({
  name: "UpdateProfileResult",
  types: () => [MeResultError, UpdateProfileInputError, UpdateProfileSuccess],
});
