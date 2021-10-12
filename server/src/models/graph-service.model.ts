// GraphService-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "graphService";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const GraphItemSchema = new Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true },
    created: { type: Date, default: Date.now },
    questions: [{ type: Schema.Types.ObjectId, ref: 'GraphItem' }],
    topics: [{ type: Schema.Types.ObjectId, ref: 'GraphItem' }],
    answer: { type: String },
  });

  const schema = new Schema({
    name: { type: String, required: true },
    isPrivate: { type: String, required: true },
    data: [GraphItemSchema],
    created: { type: Date, default: Date.now },
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
