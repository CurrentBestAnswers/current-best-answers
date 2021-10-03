import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

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

export type Graph = {
  id: string;
  name: string;
  isPrivate: boolean;
  data: GraphItem[];
  created: string;
};

export type GraphItem = {
  id: string;
  name: string;
  type: GraphItemType;
  created: string;
  questions?: GraphItem[];
  topics?: GraphItem[];
  answer?: string;

  // For frontend use only
  isMouseOver: boolean;
};

export enum GraphItemType {
  Topic = 0,
  Question = 1,
}

const initialQuestions: GraphItem[] = [
  {
    id: "1",
    name: "Financial",
    type: GraphItemType.Topic,
    isMouseOver: false,
    created: new Date().toString(),
    questions: [
      {
        id: "2",
        name: "What should I do with my money? Invest it? If so, where? What are my options?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
      },
      {
        id: "3",
        name: "What is my cost of living?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
      },
      {
        id: "4",
        name: "Should I accept the job offer to work as a teacher?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
      },
    ],
  },
  {
    id: "5",
    name: "Health",
    type: GraphItemType.Topic,
    isMouseOver: false,
    created: new Date().toString(),
    topics: [
      {
        id: "6",
        name: "Sleep",
        type: GraphItemType.Topic,
        isMouseOver: false,
        created: new Date().toString(),
        questions: [
          {
            id: "7",
            name: "What kind of sleep schedule should I follow?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
        ],
      },
      {
        id: "8",
        name: "Nutrition",
        type: GraphItemType.Topic,
        isMouseOver: false,
        created: new Date().toString(),
        questions: [
          {
            id: "9",
            name: "What kind of diet should I eat?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
            questions: [
              {
                id: "10",
                name: "Should I eat things with refined oil in them?",
                type: GraphItemType.Question,
                isMouseOver: false,
                created: new Date().toString(),
              },
              {
                id: "11",
                name: "Should I include soy in my diet? Is soy problematic to health? ",
                type: GraphItemType.Question,
                isMouseOver: false,
                created: new Date().toString(),
              },
            ],
          },
          {
            id: "12",
            name: "Should I consume caffeine?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
          {
            id: "13",
            name: "Should I take any supplements? If so, which ones?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
        ],
      },
      {
        id: "14",
        name: "Vision",
        type: GraphItemType.Topic,
        isMouseOver: false,
        created: new Date().toString(),
        questions: [
          {
            id: "15",
            name: "What kind of diet should I eat?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
            questions: [
              {
                id: "16",
                name: "Should I eat things with refined oil in them?",
                type: GraphItemType.Question,
                isMouseOver: false,
                created: new Date().toString(),
              },
              {
                id: "17",
                name: "Should I include soy in my diet? Is soy problematic to health? ",
                type: GraphItemType.Question,
                isMouseOver: false,
                created: new Date().toString(),
              },
            ],
          },
          {
            id: "18",
            name: "Should I consume caffeine?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
          {
            id: "19",
            name: "Should I take any supplements? If so, which ones?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
        ],
      },
    ],
  },
  {
    id: "20",
    name: "Stuff I Buy, Own and Use",
    type: GraphItemType.Topic,
    isMouseOver: false,
    created: new Date().toString(),
    questions: [
      {
        id: "21",
        name: "What should I ask myself before buying something? What principles / critiera should stuff I buy meet?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
      },
      {
        id: "22",
        name: "Should I own a car? If so, which one?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
        questions: [
          {
            id: "23",
            name: "Where should I get my car serviced? Should I service it myself?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
          {
            id: "24",
            name: "Should I insure my car? If so, what type, and with what company?",
            type: GraphItemType.Question,
            isMouseOver: false,
            created: new Date().toString(),
          },
        ],
      },
      {
        id: "25",
        name: "Should I own a laptop? If so, which one?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
      },
      {
        id: "26",
        name: "Should I buy, own and use a carbon fibre road bike? If so, which one?",
        type: GraphItemType.Question,
        isMouseOver: false,
        created: new Date().toString(),
      },
    ],
  },
];

const initialState: GraphsState = {
  graphs: [
    {
      id: "personal",
      name: "Personal",
      isPrivate: true,
      created: new Date().toString(),
      data: cloneDeep(initialQuestions),
    },
    {
      id: "work",
      name: "Work",
      isPrivate: true,
      created: new Date().toString(),
      data: cloneDeep(initialQuestions),
    },
    {
      id: "public",
      name: "Public",
      isPrivate: false,
      created: new Date().toString(),
      data: cloneDeep(initialQuestions),
    },
  ],
  status: GraphStatus.None,
  error: "",
};

export const graphsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
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
  graphs.find((graph) => graph.id === id);

/**
 * https://stackoverflow.com/a/53390570
 */
export const getGraphItem = (
  items: GraphItem[],
  findId: string
): GraphItem | undefined =>
  items.reduce(
    (previousValue: GraphItem | undefined, currentValue: GraphItem) => {
      if (previousValue) return previousValue;
      if (currentValue.id === findId) return currentValue;
      if (currentValue.topics) return getGraphItem(currentValue.topics, findId);
      if (currentValue.questions)
        return getGraphItem(currentValue.questions, findId);
    },
    undefined
  );

export const generateUUID = () => {
  let uniqueId =
    Math.random().toString(36).substring(2) + Date.now().toString(36);
  return uniqueId;
};

export const { addNewGraph, addNewGraphItem, updateGraphItemAnswer, setMouseOver } =
  graphsSlice.actions;

export default graphsSlice.reducer;
