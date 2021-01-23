import { ObjectType, Field, Int } from "type-graphql";
import { Entity as TOEntity, Column, Index } from "typeorm";
import Entity from "./Entity";
import { getAgeFromDateOfBirth } from "../util/utils";
import { Expose } from "class-transformer";

@TOEntity("users")
@ObjectType()
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Field()
  @Column()
  @Index()
  studentCode: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String)
  @Column()
  career: string;

  @Field(() => String)
  @Column("text")
  description: string;

  @Field(() => Date)
  @Column("date")
  birthday: Date;

  @Field(() => String)
  @Column()
  gender: string;

  @Field(() => String)
  @Column({ nullable: true })
  primaryImageUrl: string;

  @Field(() => [String])
  @Column("text", { array: true, nullable: true })
  secondaryImagesUrl: string[];

  @Field(() => Preferences)
  @Column(() => Preferences)
  preferences: Preferences;

  @Field(() => Int)
  @Expose()
  get age(): number {
    return getAgeFromDateOfBirth(this.birthday);
  }
}

@ObjectType()
export class Preferences {
  @Field(() => String)
  @Column("varchar", { default: "b" })
  preferedGender: string;

  @Field(() => Int)
  @Column("int", { default: 18 })
  minAge: number;

  @Field(() => Int)
  @Column("int", { default: 30 })
  maxAge: number;

  @Field(() => [String])
  @Column("text", { array: true, nullable: true })
  interests: string[];
}
