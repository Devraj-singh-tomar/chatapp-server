import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "ChatAppp" })
    .then((data) => {
      console.log(`connected to ${data.connection.port}`);
    })
    .catch((err) => {
      throw err;
    });
};

export const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("token", token, cookieOptions).json({
    success: true,
    message,
  });
};
