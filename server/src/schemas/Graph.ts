import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Graph {
  @Field()
  id: number

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  status: boolean
}

@InputType()
export class GraphInput implements Partial<Graph> {
  @Field()
  title: string

  @Field()
  description: string
}