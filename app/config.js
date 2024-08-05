import dotenv from "dotenv";
dotenv.config();

let config = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtSecret: "jwtSecret",
  jwtExpiration: "24h",
  gmail: process.env.EMAIL,
  password: process.env.PASSWORD,
};

const { urlDb, jwtSecret, jwtExpiration, gmail, password } = config;

export { urlDb, jwtSecret, jwtExpiration, gmail, password };
