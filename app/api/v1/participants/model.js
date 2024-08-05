import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const participantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Nama depan harus diisi!"],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email harus diisi!"],
    },
    password: {
      type: String,
      required: [true, "Password harus diisi!"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      enum: ["aktif", "tidak aktif"],
      default: "tidak aktif",
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

participantSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcryptjs.hash(User.password, 12);
  }
  next();
});

participantSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Participant", participantSchema);
