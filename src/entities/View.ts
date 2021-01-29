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
    onDelete: "CASCADE",
    cascade: true,
    eager: true,
  })
  viewer: User;

  @ManyToOne(() => User, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  target: User;

  @Field(() => Boolean)
  @Column("boolean", { default: true })
  liked: boolean;
}
