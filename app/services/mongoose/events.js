import Events from "../../api/v1/events/model.js";
import { checkingImage } from "./images.js";
import { checkingCategories } from "./categories.js";
import { checkingTalents } from "./talents.js";
import { NotFoundError, BadRequestError } from "../../errors/index.js";

const getAllEvents = async (req) => {
  const { keyword, category, talent, status } = req.query;
  let condition = { organizer: req.user.organizer };

  if (keyword)
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };

  if (category) condition = { ...condition, category };

  if (talent) condition = { ...condition, talent };

  if (["Draft", "Published"].includes(status))
    condition = { ...condition, statusEvent: status };

  const result = await Events.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({ path: "category", select: "_id name" })
    .populate({ path: "talent", select: "_id name role image" });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({ title });
  if (check) throw new BadRequestError("Judul acara sudah terdaftar");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const checkEvent = await Events.findOne({
    _id: id,
  });

  if (!checkEvent) throw new NotFoundError(`Tidak ada acara dengan id ${id}`);

  const check = await Events.findOne({
    title,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("judul acara sudah terdaftar");

  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  let result = await Events.findOne({ _id: id, organizer: req.user.organizer });

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id ${id}`);

  result = await Events.findByIdAndDelete({
    _id: id,
  });

  return result;
};

const changeStatusEvents = async (req) => {
  const { id } = req.params;
  const { statusEvent } = req.body;

  if (!["Draft", "Published"].includes(statusEvent))
    throw new BadRequestError("Status harus Draft atau Published");

  const checkEvent = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!checkEvent) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`);

  checkEvent.statusEvent = statusEvent;

  await checkEvent.save();

  return checkEvent;
};

export {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
  changeStatusEvents,
};
