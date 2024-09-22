import { Field, Float, ID, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./category.entity";
import { ReservationMaterial } from "./reservation_material.entity";

// =================================================================
//                           OBJECT TYPE
// =================================================================
@ObjectType()
@Entity()
export default class Material {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column()
  description: string;

  // @Field()
  // @Column()
  // disponibility: boolean;

  @Field(() => Category)
  @ManyToOne(() => Category, (c) => c.material, {
    cascade: true,
  })
  category: Category;

  @Field(() => [ReservationMaterial])
  @JoinColumn()
  @OneToMany(() => ReservationMaterial, (r) => r.material)
  reservationMaterials: ReservationMaterial[];
}

// Quand on fait un ObjectType à supprimer, ne pas mettre d'id. Il sera supprimé, donc pas de retour.
@ObjectType()
export class MaterialDeleted {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Float, { nullable: true })
  price: number;

  @Field({ nullable: true })
  picture: string;

  @Field(() => Category)
  category: Category;
}

// =================================================================
//                           INPUT TYPE
// =================================================================
@InputType()
export class PartialCategoryInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class CreateMaterialInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => Float, { nullable: false })
  price: number;

  @Field({ nullable: false })
  quantity: number;

  @Field()
  picture: string;

  @Field({ nullable: false })
  category: PartialCategoryInput;
}

@InputType()
export class UpdateMaterialInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  category?: PartialCategoryInput;
}
