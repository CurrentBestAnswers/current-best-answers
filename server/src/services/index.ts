import { Application } from '../declarations';
import graphService from './graph-service/graph-service.service';
import graphItem from './graph-item/graph-item.service';
import graph from './graph/graph.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(graphService);
  app.configure(graphItem);
  app.configure(graph);
}
