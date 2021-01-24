import Entity from "./Entity";
import { Entity as TOEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import User from "./User";

@TOEntity("views")
@ObjectType()
export default class View extends Entity {
  constructor(view: Partial<View>) {
    super();
    Object.assign(this, view);
  }

  @ManyToOne(() => User, (u) => u.views, {
    primary: true,
    onDelete: "CASCADE",
    cascade: true,
  })
  viewer: User;

  @ManyToOne(() => User, (u) => u.targets, {
    primary: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  target: User;

  @Field(() => Boolean)
  @Column("boolean", { default: false })
  liked: boolean;
}
