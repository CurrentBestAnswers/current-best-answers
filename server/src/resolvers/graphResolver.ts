import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { getId } from "../helpers";
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
    @Arg("graphInput") { name, isPrivate }: GraphInput
  ): Promise<Graph> {
    const graph: Graph = {
      id: getId(),
      name,
      isPrivate,
      data: [],
      created: new Date(),
    };

    await this.graphs.push(graph);
    return graph;
  }

  @Mutation((returns) => Graph)
  async addGraphItem(
    @Arg("graphInput") { name, isPrivate }: GraphInput
  ): Promise<Graph> {
    const graph: Graph = {
      id: getId(),
      name,
      isPrivate,
      data: [],
      created: new Date(),
    };

    await this.graphs.push(graph);
    return graph;
  }
}

export const generateUUID = () => {
  let uniqueId =
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  return uniqueId;
};
