export interface GraphsResponse {
  total: number;
  limit: number;
  skip: number;
  data: Graph[];
}

export interface Graph {
  _id: string;
  data: GraphItem[];
  name: string;
  isPrivate: boolean;
  created: string;
  __v: number;
}

export interface GraphItem {
  _id: string;
  questions: GraphItem[];
  topics: GraphItem[];
  name: string;
  type: GraphItemType;
  created: string;
  answer: string;
  __v: number;

  // For frontend use only
  isMouseOver: boolean;
}

export enum GraphItemType {
  Topic = 0,
  Question = 1,
}
