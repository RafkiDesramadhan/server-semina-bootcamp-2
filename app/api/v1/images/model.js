import mongoose from "mongoose";
const { model, Schema } = mongoose;

let imageSchema = Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export default model("Image", imageSchema);
