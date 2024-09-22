import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Material from "./material.entity";

@ObjectType()
@Entity()
export default class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Material])
  @OneToMany(() => Material, (m) => m.category)
  material?: Material[];

}

@InputType()
export class CreateCategoryInput {
  @Field({ nullable: false })
  name: string;
}
