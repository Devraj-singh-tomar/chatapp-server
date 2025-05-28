import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { fi } from "@faker-js/faker";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return next(new ErrorHandler("Please login to get access", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decodedData);

  req.user = decodedData._id;

  next();
};

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
