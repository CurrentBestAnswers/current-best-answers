// graphItem-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'graphItem';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true }, // Topic = 0, Question = 1,
    graph: { type: Schema.Types.ObjectId, ref: 'graph', required: true },
    created: { type: Date, default: Date.now },
    questions: [{ type: Schema.Types.ObjectId, ref: 'graphItem' }],
    topics: [{ type: Schema.Types.ObjectId, ref: 'graphItem' }],
    answer: { type: String },
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
