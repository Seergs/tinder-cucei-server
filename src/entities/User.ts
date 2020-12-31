import { ObjectType, Field } from "type-graphql";
import { Entity as TOEntity, Column } from "typeorm";
import Entity from "./Entity";

@TOEntity("users")
@ObjectType()
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  fatherLastName: string;

  @Field(() => String)
  @Column()
  motherLastName: string;

  @Field(() => String)
  @Column()
  career: string;

  @Field(() => String)
  @Column("text")
  description: string;

  @Field(() => Date)
  @Column({ type: "date" })
  birthday: Date;

  @Field(() => String)
  @Column({ nullable: true })
  primaryImageUrn: string;

  @Field(() => [String])
  @Column("text", { array: true, nullable: true })
  secondaryImagesUrn: string[];
}
