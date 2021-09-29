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
};

export type GraphItem = {
  id: string;
  name: string;
  type: GraphItemType;
  questions?: GraphItem[];
  topics?: GraphItem[];

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
    questions: [
      {
        id: "2",
        name: "What should I do with my money? Invest it? If so, where? What are my options?",
        type: GraphItemType.Question,
        isMouseOver: false,
      },
      {
        id: "3",
        name: "What is my cost of living?",
        type: GraphItemType.Question,
        isMouseOver: false,
      },
      {
        id: "4",
        name: "Should I accept the job offer to work as a teacher?",
        type: GraphItemType.Question,
        isMouseOver: false,
      },
    ],
  },
  {
    id: "5",
    name: "Health",
    type: GraphItemType.Topic,
    isMouseOver: false,
    topics: [
      {
        id: "6",
        name: "Sleep",
        type: GraphItemType.Topic,
        isMouseOver: false,
        questions: [
          {
            id: "7",
            name: "What kind of sleep schedule should I follow?",
            type: GraphItemType.Question,
            isMouseOver: false,
          },
        ],
      },
      {
        id: "8",
        name: "Nutrition",
        type: GraphItemType.Topic,
        isMouseOver: false,
        questions: [
          {
            id: "9",
            name: "What kind of diet should I eat?",
            type: GraphItemType.Question,
            isMouseOver: false,
            questions: [
              {
                id: "10",
                name: "Should I eat things with refined oil in them?",
                type: GraphItemType.Question,
                isMouseOver: false,
              },
              {
                id: "11",
                name: "Should I include soy in my diet? Is soy problematic to health? ",
                type: GraphItemType.Question,
                isMouseOver: false,
              },
            ],
          },
          {
            id: "12",
            name: "Should I consume caffeine?",
            type: GraphItemType.Question,
            isMouseOver: false,
          },
          {
            id: "13",
            name: "Should I take any supplements? If so, which ones?",
            type: GraphItemType.Question,
            isMouseOver: false,
          },
        ],
      },
      {
        id: "14",
        name: "Vision",
        type: GraphItemType.Topic,
        isMouseOver: false,
        questions: [
          {
            id: "15",
            name: "What kind of diet should I eat?",
            type: GraphItemType.Question,
            isMouseOver: false,
            questions: [
              {
                id: "16",
                name: "Should I eat things with refined oil in them?",
                type: GraphItemType.Question,
                isMouseOver: false,
              },
              {
                id: "17",
                name: "Should I include soy in my diet? Is soy problematic to health? ",
                type: GraphItemType.Question,
                isMouseOver: false,
              },
            ],
          },
          {
            id: "18",
            name: "Should I consume caffeine?",
            type: GraphItemType.Question,
            isMouseOver: false,
          },
          {
            id: "19",
            name: "Should I take any supplements? If so, which ones?",
            type: GraphItemType.Question,
            isMouseOver: false,
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
    questions: [
      {
        id: "21",
        name: "What should I ask myself before buying something? What principles / critiera should stuff I buy meet?",
        type: GraphItemType.Question,
        isMouseOver: false,
      },
      {
        id: "22",
        name: "Should I own a car? If so, which one?",
        type: GraphItemType.Question,
        isMouseOver: false,
        questions: [
          {
            id: "23",
            name: "Where should I get my car serviced? Should I service it myself?",
            type: GraphItemType.Question,
            isMouseOver: false,
          },
          {
            id: "24",
            name: "Should I insure my car? If so, what type, and with what company?",
            type: GraphItemType.Question,
            isMouseOver: false,
          },
        ],
      },
      {
        id: "25",
        name: "Should I own a laptop? If so, which one?",
        type: GraphItemType.Question,
        isMouseOver: false,
      },
      {
        id: "26",
        name: "Should I buy, own and use a carbon fibre road bike? If so, which one?",
        type: GraphItemType.Question,
        isMouseOver: false,
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
      data: cloneDeep(initialQuestions),
    },
    {
      id: "work",
      name: "Work",
      isPrivate: true,
      data: cloneDeep(initialQuestions),
    },
    {
      id: "public",
      name: "Public",
      isPrivate: false,
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
        let graphItem = findGraphItem(graph.data, action.payload.id);
        if (graphItem) {
          graphItem.isMouseOver = action.payload.isMouseOver;
        }
      }
    },
  },
});

export const getGraph = (graphs: Graph[], id: string) =>
  graphs.find((graph) => graph.id === id);

//TODO: This should be re written with reduce()
export const findGraphItem = (
  items: GraphItem[],
  findId: string
): GraphItem | undefined => {
  let found = undefined;

  for (let item of items) {
    if (item.id === findId) {
      found = item;
      break;
    }
    if (item.topics) {
      let question = findGraphItem(item.topics, findId);
      if (question) {
        found = question;
        break;
      }
    }
    if (item.questions) {
      let question = findGraphItem(item.questions, findId);
      if (question) {
        found = question;
        break;
      }
    }
  }

  return found;
};

export const { addNewGraph, setMouseOver } = graphsSlice.actions;

export default graphsSlice.reducer;
