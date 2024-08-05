import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error.js";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
