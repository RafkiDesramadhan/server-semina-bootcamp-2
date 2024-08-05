import { signIn } from "../../../services/mongoose/auth.js";
import { StatusCodes } from "http-status-codes";

const signInCMS = async (req, res, next) => {
  try {
    const result = await signIn(req);

    res.status(StatusCodes.CREATED).json({
      data: { token: result.token, role: result.role },
    });
  } catch (error) {
    next(error);
  }
};

export { signInCMS };
