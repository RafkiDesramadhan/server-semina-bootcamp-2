import { StatusCodes } from "http-status-codes";
import { createImages } from "../../../services/mongoose/images.js";

const create = async (req, res, next) => {
  try {
    const result = await createImages(req);

    res.status(StatusCodes.CREATED).json({
      date: result,
    });
  } catch (error) {
    next(error);
  }
};

export { create };
