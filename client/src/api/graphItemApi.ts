import axios from "axios";
import { GraphItem, GraphItemType } from "../models/graph";

const Routes = {
  Root_Endpoint: "http://localhost:4030",
  GraphItem_Service: "/graph-item",
};

export async function postGraphItem(name: string, type: GraphItemType) {
  const endpoint = `${Routes.Root_Endpoint}${Routes.GraphItem_Service}`;
  const body = {
    name,
    type,
  };

  try {
    let response = await axios.post<GraphItem>(endpoint, body);
    return response.data;
  } catch (error: any) {
    console.log("Error in postGraphItem API: ", error);
    throw error;
  }
}

export async function patchGraphItem(graphId: string, graphItemId: string) {
  const endpoint = `${Routes.Root_Endpoint}${Routes.GraphItem_Service}/${graphId}`;
  const body = {
    data: [graphItemId],
  };

  try {
    let response = await axios.patch<GraphItem>(endpoint, body);
    return response.data;
  } catch (error: any) {
    console.log("Error in patchGraphItem API: ", error);
    throw error;
  }
}
