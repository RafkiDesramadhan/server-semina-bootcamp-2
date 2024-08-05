import nodemailer from "nodemailer";
import { gmail, password } from "../../config.js";
import Mustache from "mustache";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Otp for registration is : ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

const checkoutMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/checkout.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Checkout for events ticket",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

export { otpMail, checkoutMail };
