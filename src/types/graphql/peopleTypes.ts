import { ObjectType, createUnionType, Field, Int } from "type-graphql";
import User from "../../entities/User";
import { MeResultError } from "./userTypes";

@ObjectType()
export class PeopleSuccess {
  constructor(people: Partial<PeopleSuccess>) {
    Object.assign(this, people);
  }

  @Field(() => [Person])
  people: Person[];
}

export const PeopleResult = createUnionType({
  name: "PeopleResult",
  types: () => [PeopleSuccess, MeResultError],
});

@ObjectType()
export class Person implements Partial<User> {
  constructor(person: Person) {
    Object.assign(this, person);
  }
  @Field()
  id: string;

  @Field()
  career: string;

  @Field(() => Date)
  birthday: Date;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  primaryImageUrl: string;

  @Field(() => [String])
  secondaryImagesUrl: string[];

  @Field()
  viewId: string;

  @Field(() => Int)
  age: number;

  @Field(() => [String])
  interests: string[];
}
