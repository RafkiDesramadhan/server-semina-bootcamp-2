import Images from "../../api/v1/images/model.js";
import { NotFoundError } from "../../errors/index.js";

const createImages = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpg`,
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan id ${id}`);

  return result;
};

export { createImages, checkingImage };
