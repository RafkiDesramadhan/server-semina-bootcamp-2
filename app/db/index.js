import mongoose from "mongoose";
import { urlDb } from "../config.js";

mongoose.connect(urlDb);

const db = mongoose.connection;

export default db;
