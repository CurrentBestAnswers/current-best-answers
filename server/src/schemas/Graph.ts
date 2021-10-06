import {
  Field,
  ObjectType,
  InputType,
  ID,
  registerEnumType,
} from "type-graphql";

@ObjectType()
export class Graph {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  name: string;

  @Field()
  isPrivate: boolean;

  @Field((type) => [GraphItem], { nullable: true })
  data: GraphItem[];

  @Field()
  created: Date;
}

@ObjectType()
export class GraphItem {
  @Field((type) => ID)
  readonly id: string;

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
