import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

interface Graph {
  _id: string;
  name: string;
  isPrivate: boolean;
  data: GraphItem[];
  created: Date;
};

interface GraphItem {
  _id: string;
  name: string;
  type: GraphItemType;
  created: Date;
  questions?: GraphItem[];
  topics?: GraphItem[];
  answer?: string;
};

export enum GraphItemType {
  Topic = 0,
  Question = 1,
}

export class GraphService extends Service<Graph> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
