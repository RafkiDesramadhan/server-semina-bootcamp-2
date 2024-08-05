import Participants from "../../api/v1/participants/model.js";
import Events from "../../api/v1/events/model.js";
import Orders from "../../api/v1/orders/model.js";
import Payments from "../../api/v1/payments/model.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../errors/index.js";
import { checkoutMail, otpMail } from "../mail/index.js";
import { createJWT } from "../../utils/jwt.js";
import { createTokenParticipant } from "../../utils/createTokenUser.js";

const signUpParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  let result = await Participants.findOne({
    email,
    status: "tidak aktif",
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Participants.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  await otpMail(email, result);

  delete result._doc.password;

  return result;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participants.findOne({
    email,
  });

  if (!check) throw new NotFoundError("Partisipan belum terdaftar");

  if (check && check.otp !== otp) throw new BadRequestError("Kode otp salah");

  const result = await Participants.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true, runValidators: true }
  );

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const signInParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email && !password)
    throw new BadRequestError("Please provide email and password");

  const result = await Participants.findOne({ email });

  if (!result) throw new UnauthorizedError("Invalid credentials");

  if (result.status === "tidak aktif")
    throw new UnauthorizedError("Akun anda belum aktif");

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) throw new UnauthorizedError("Invalid credentials");

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllEvents = async () => {
  const result = await Events.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate("category")
    .populate("talent")
    .populate("image");

  if (!result) throw new BadRequestError(`Tidak ada acara dengan id : ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets } = req.body;

  const checkingEvent = await Events.findOne({ _id: event });

  if (!checkingEvent)
    throw new NotFoundError(`Tidak ada acara dengan id : ${event}`);

  const checkingPayment = await Payments.findOne({ _id: payment });

  if (!checkingPayment)
    throw new NotFoundError(`Tidak ada pembayaran dengan id : ${payment}`);

  let totalPay = 0,
    totalOrderTicket = 0;

  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new NotFoundError("Stock event tidak mencukupi");
        } else {
          ticket.stock -= tic.sumTicket;
          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets,
    talent: checkingEvent.talent,
    image: checkingEvent.image,
    category: checkingEvent.category,
    event: checkingEvent.event,
    organizer: checkingEvent.organizer,
  };

  const result = new Orders({
    date: new Date(),
    personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  await result.save();
  await checkoutMail(result.personalDetail.email, result);
  return result;
};

export {
  signUpParticipant,
  activateParticipant,
  signInParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
};
