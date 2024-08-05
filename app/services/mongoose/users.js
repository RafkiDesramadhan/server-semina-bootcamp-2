import Users from "../../api/v1/users/model.js";
import Organizers from "../../api/v1/organizers/model.js";
import { BadRequestError } from "../../errors/index.js";

const createOrganizer = async (req) => {
  const { organizer, role, email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("Password dan confirmPassword tidak cocok");

  const result = await Organizers.create({ organizer });

  const users = await Users.create({
    email,
    role,
    name,
    password,
    organizer: result._id,
  });

  delete users._doc.password;

  return users;
};

const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword)
    throw new BadRequestError("Password dan Konfirm Password tidak cocok");

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });

  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

export { createOrganizer, createUsers, getAllUsers };
