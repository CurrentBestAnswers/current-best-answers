import axios from "axios";
import { Graph, GraphsResponse } from "../models/graph";

const Routes = {
  Root_Endpoint: "http://localhost:4030",
  Graph_Service: "/graph",
};

export async function postGraph(name: string, isPrivate: boolean) {
  const endpoint = `${Routes.Root_Endpoint}${Routes.Graph_Service}`;
  const body = {
    name,
    isPrivate,
    data: [],
  };

  try {
    let response = await axios.post<Graph>(endpoint, body);
    return response.data;
  } catch (error: any) {
    console.log("Error in postGraph API:", error);
    throw error;
  }
}

export async function getGraphs() {
  const endpoint = `${Routes.Root_Endpoint}${Routes.Graph_Service}`;

  try {
    let response = await axios.get<GraphsResponse>(endpoint);
    return response.data;
  } catch (error: any) {
    console.log("Error in getGraphs API: ", error);
    throw error;
  }
}

export async function patchGraph(graphId: string, graphItemId: string) {
  const endpoint = `${Routes.Root_Endpoint}${Routes.Graph_Service}/${graphId}`;
  const body = {
    data: [graphItemId],
  };

  try {
    let response = await axios.patch<Graph>(endpoint, body);
    return response.data;
  } catch (error: any) {
    console.log("Error in patchGraph API: ", error);
    throw error;
  }
}