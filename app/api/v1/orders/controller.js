import { getAllOrders } from "../../../services/mongoose/orders.js";
import { StatusCodes } from "http-status-codes";

const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: {
        order: result.data,
        pages: result.pages,
        total: result.total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { index };
