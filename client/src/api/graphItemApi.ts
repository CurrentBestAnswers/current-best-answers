import axios from "axios";
import { GraphItem, GraphItemType } from "../models/graph";

const Routes = {
  Root_Endpoint: "http://localhost:4030",
  GraphItem_Service: "/graph-item",
};

export async function postGraphItem(graphId: string, name: string, type: GraphItemType) {
  const endpoint = `${Routes.Root_Endpoint}${Routes.GraphItem_Service}`;
  const body = {
    name,
    type,
    graph: graphId,
  };

  try {
    let response = await axios.post<GraphItem>(endpoint, body);
    return response.data;
  } catch (error: any) {
    console.log("Error in postGraphItem API: ", error);
    throw error;
  }
}

export async function patchGraphItemTopics(parentGraphItem: GraphItem, graphItemId: string) {
  const body = {
    topics: [graphItemId],
  };

  return patchGraphItem(parentGraphItem, body);
}

export async function patchGraphItemQuestions(parentGraphItem: GraphItem, graphItemId: string) {
  const body = {
    questions: [graphItemId],
  };
  
  return patchGraphItem(parentGraphItem, body);
}

export async function patchGraphItemAnswer(graphItem: GraphItem, answer: string) {
  const body = {
    answer: answer
  };
  
  return patchGraphItem(graphItem, body);
}

async function patchGraphItem(graphItem: GraphItem, body: any) {
  const endpoint = `${Routes.Root_Endpoint}${Routes.GraphItem_Service}/${graphItem._id}`;

  try {
    let response = await axios.patch<GraphItem>(endpoint, body);
    return response.data;
  } catch (error: any) {
    console.log("Error in patchGraphItem API: ", error);
    throw error;
  }
}
