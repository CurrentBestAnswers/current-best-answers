import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Graph, GraphItem, GraphItemType } from "../models/graph";

export type GraphsState = {
  graphs: Graph[];
  status: GraphStatus;
  error: string;
};

export enum GraphStatus {
  None = 0,
  FetchingGraphs,
  Error,
}

const initialState: GraphsState = {
  graphs: [],
  status: GraphStatus.None,
  error: "",
};

export const graphsSlice = createSlice({
  name: "graphs",
  initialState,
  reducers: {
    fetchGraphs: (state) => {
      state.status = GraphStatus.FetchingGraphs;
    },
    fetchedGraphs: (state, action: PayloadAction<Graph[]>) => {
      state.status = GraphStatus.None;
      state.error = "";
      state.graphs = action.payload;
    },
    setGraphError: (state, action: PayloadAction<string>) => {
      state.status = GraphStatus.Error;
      state.error = action.payload;
    },
    addNewGraph: (state, action: PayloadAction<Graph>) => {
      state.graphs.push(action.payload);
    },
    addNewGraphItem: (
      state,
      action: PayloadAction<{
        newItem: GraphItem;
        graphId: string;
        parentItemId: string | undefined;
      }>
    ) => {
      const { newItem, graphId, parentItemId } = action.payload;
      newItem.isMouseOver = false;

      let graph = getGraph(state.graphs, graphId);
      if (graph) {
        if (parentItemId) {
          let graphItem = getGraphItem(graph.data, parentItemId!);

          if (graphItem && newItem.type === GraphItemType.Topic) {
            graphItem.topics
              ? graphItem.topics.push(newItem)
              : (graphItem.topics = [newItem]);
          } else if (graphItem && newItem.type === GraphItemType.Question) {
            graphItem.questions
              ? graphItem.questions.push(newItem)
              : (graphItem.questions = [newItem]);
          }
        } else {
          graph.data.push(newItem);
        }
      }
    },
    updateGraphItemAnswer: (
      state,
      action: PayloadAction<{
        answer: string;
        graphId: string;
        graphItemId: string;
      }>
    ) => {
      const { answer, graphId, graphItemId } = action.payload;

      let graph = getGraph(state.graphs, graphId);
      if (graph) {
        let graphItem = getGraphItem(graph.data, graphItemId);
        if (graphItem) {
          graphItem.answer = answer;
        }
      }
    },
    setMouseOver: (
      state,
      action: PayloadAction<{
        id: string;
        graphId: string;
        isMouseOver: boolean;
      }>
    ) => {
      let graph = getGraph(state.graphs, action.payload.graphId);
      if (graph) {
        let graphItem = getGraphItem(graph.data, action.payload.id);
        if (graphItem) {
          graphItem.isMouseOver = action.payload.isMouseOver;
        }
      }
    },
  },
});

export const getGraph = (graphs: Graph[], id: string) =>
  graphs.find((graph) => graph._id === id);

/**
 * https://stackoverflow.com/a/53390570
 */
// export const getGraphItem = (
//   items: GraphItem[],
//   findId: string
// ): GraphItem | undefined =>
//   items.reduce(
//     (previousValue: GraphItem | undefined, currentValue: GraphItem) => {
//       if (previousValue) return previousValue;
//       if (currentValue._id === findId) return currentValue;
//       if (currentValue.topics) return getGraphItem(currentValue.topics, findId);
//       if (currentValue.questions)
//         return getGraphItem(currentValue.questions, findId);
//     },
//     undefined
//   );

export const getGraphItem = (
  items: GraphItem[],
  findId: string
): GraphItem | undefined => {
  let found = undefined;

  for (let item of items) {
    if (item._id === findId) {
      found = item;
      break;
    }
    if (item.topics) {
      let topic = getGraphItem(item.topics, findId);
      if (topic) {
        found = topic;
        break;
      }
    }
    if (item.questions) {
      let question = getGraphItem(item.questions, findId);
      if (question) {
        found = question;
        break;
      }
    }
  }

  return found;
};

export const generateUUID = () => {
  let uniqueId =
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  return uniqueId;
};

export const {
  fetchGraphs,
  fetchedGraphs,
  setGraphError,
  addNewGraph,
  addNewGraphItem,
  updateGraphItemAnswer,
  setMouseOver,
} = graphsSlice.actions;

export default graphsSlice.reducer;
