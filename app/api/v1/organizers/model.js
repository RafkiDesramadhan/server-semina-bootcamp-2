import mongoose from "mongoose";
const { model, Schema } = mongoose;

let organizersSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Penyelenggara harus diisi"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Organizer", organizersSchema);
