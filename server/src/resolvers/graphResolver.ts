import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Graph, GraphInput } from "../schemas/Graph";

@Resolver((of) => Graph)
export class GraphResolver {
  private graphs: Graph[] = [];

  @Query((returns) => [Graph], { nullable: true })
  async getGraphs(): Promise<Graph[]> {
    return await this.graphs;
  }

  @Mutation((returns) => Graph)
  async addGraph(
    @Arg("graphInput") { title, description }: GraphInput
  ): Promise<Graph> {
    const graph = {
      id: Math.random(), // not really unique
      title,
      description,
      status: false,
    };

    await this.graphs.push(graph);
    return graph;
  }
}
