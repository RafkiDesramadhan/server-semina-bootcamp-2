import Users from "../../api/v1/users/model.js";
import { BadRequestError, UnauthorizedError } from "../../errors/index.js";
import { createTokenUser, createJWT } from "../../utils/index.js";

const signIn = async (req) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");

  const result = await Users.findOne({ email });
  if (!result) throw new UnauthorizedError("Invalid Credentials");

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthorizedError("Invalid Credentials");

  const token = createJWT({ payload: createTokenUser(result) });

  return { token, role: result.role };
};

export { signIn };
