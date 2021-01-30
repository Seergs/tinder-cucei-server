import { ObjectType, Field } from "type-graphql";
import { Column, Entity as TOEntity, ManyToOne } from "typeorm";
import Entity from "./Entity";
import User from "./User";

@ObjectType()
@TOEntity("matches")
export default class Match extends Entity {
  constructor(match: Partial<Match>) {
    super();
    Object.assign(this, match);
  }

  @ManyToOne(() => User, (u) => u.matches, {
    onDelete: "CASCADE",
    cascade: true,
    eager: true,
  })
  userOne: User;

  @ManyToOne(() => User, (u) => u.matches, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  userTwo: User;
}
