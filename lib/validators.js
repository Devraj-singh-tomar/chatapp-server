import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("username", "Please enter username").notEmpty(),
  body("bio", "Please enter bio").notEmpty(),
  body("password", "Please enter password").notEmpty(),
];

export { registerValidator, validateHandler };
