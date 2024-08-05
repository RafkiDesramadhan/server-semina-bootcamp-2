import mongoose from "mongoose";
const { model, Schema } = mongoose;

let talentsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi!"],
    },
    role: {
      type: String,
      default: "-",
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Talent", talentsSchema);
