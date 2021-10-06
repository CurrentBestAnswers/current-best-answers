import {Sequelize} from 'sequelize-typescript';
import { Graph, GraphItem } from './schemas/Graph';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [Graph, GraphItem],
});