import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) return next(new ErrorHandler("Please login to get access", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decodedData);

  req.user = decodedData._id;

  next();
};
