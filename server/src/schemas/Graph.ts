import { BelongsTo, Column, HasMany, Model, Table } from "sequelize-typescript";
import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from "type-graphql";

@ObjectType()
@Table
export class Graph extends Model {
  @Field((type) => ID)
  @Column
  readonly id: string;

  @Field()
  @Column
  name: string;

  @Field()
  @Column
  isPrivate: boolean;

  @Field((type) => [GraphItem], { nullable: true })
  @HasMany(() => GraphItem)
  data: GraphItem[];

  @Field()
  @Column
  created: Date;
}

@ObjectType()
export class GraphItem extends Model {
  @Field((type) => ID)
  readonly id: string;
  
  @BelongsTo(() => Graph)
  graph: Graph

  @Field()
  name: string;

  @Field((type) => GraphItemType)
  type: GraphItemType;

  @Field((type) => [GraphItem], { nullable: true })
  questions?: GraphItem[];

  @Field((type) => [GraphItem], { nullable: true })
  topics?: GraphItem[];

  @Field({ nullable: true })
  answer?: string;

  @Field()
  created: Date;
}

export enum GraphItemType {
  Topic = 0,
  Question = 1,
}

registerEnumType(GraphItemType, {
  name: "GraphItemType",
});

@InputType()
export class GraphInput implements Partial<Graph> {
  @Field()
  name: string;

  @Field()
  isPrivate: boolean;
}

@InputType()
export class GraphItemInput implements Partial<GraphItem> {
  @Field()
  name: string;

  @Field((type) => GraphItemType)
  type: GraphItemType;

  @Field((type) => [GraphItem], { nullable: true })
  questions?: GraphItem[];

  @Field((type) => [GraphItem], { nullable: true })
  topics?: GraphItem[];

  @Field({ nullable: true })
  answer?: string;
}
function OneToMany(arg0: () => typeof GraphItem) {
  throw new Error("Function not implemented.");
}

