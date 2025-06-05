import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { fi } from "@faker-js/faker";
import { TryCatch } from "./error.js";
import { TOKEN } from "../constants/config.js";
import { User } from "../models/user.model.js";

export const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[TOKEN];

  if (!token) return next(new ErrorHandler("Please login to get access", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decodedData);

  req.user = decodedData._id;

  next();
});

export const adminOnly = (req, res, next) => {
  const token = req.cookies["admin-token"];

  if (!token)
    return next(new ErrorHandler("Only admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only admin can access this route", 401));

  next();
};

export const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);

    const authtoken = socket.request.cookies[TOKEN];

    if (!authtoken)
      return next(new ErrorHandler("Please login to access", 401));

    const decodedData = jwt.verify(authtoken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user) return next(new ErrorHandler("Please login to access", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);

    return next(new ErrorHandler("Please login to access", 401));
  }
};
