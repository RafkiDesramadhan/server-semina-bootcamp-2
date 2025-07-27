const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  ticketCategories: {
    type: {
      type: String,
      required: [true, "Tipe tiket harus diisi"],
    },
    price: {
      type: Number,
      default: 0,
    },
    sumTicket: {
      ticket: Number,
      required: true,
    },
  },
});

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "Please provide firstName"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Please provide lastName"],
        minglength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, "Please provide email"],
      },
      role: {
        type: String,
        default: "Designer",
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
    },
    totalPay: {
      type: Number,
      required: true,
    },
    totalOrderTicket: {
      type: Number,
      required: true,
    },
    orderItems: [orderDetailSchema],
    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);
