import Categories from "../../api/v1/categories/model.js";
import { BadRequestError, NotFoundError } from "../../errors/index.js";

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });
  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;
  let result = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });
  if (result) throw new BadRequestError("kategori nama duplikat");

  result = await Categories.create({ name, organizer: req.user.organizer });
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError(`kategori nama duplikat`);

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  let result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`);

  result = await Categories.findByIdAndDelete({ _id: id });

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan id ${id}`);

  return result;
};

export {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
