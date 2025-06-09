import { body, check, param, validationResult } from "express-validator";
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

const loginValidator = () => [
  body("username", "Please enter username").notEmpty(),
  body("password", "Please enter password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please enter name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please add members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please enter chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please add members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please enter chat ID").notEmpty(),
  body("userId", "Please enter user ID").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please enter chat ID").notEmpty()];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
];

const renameValidator = () => [
  param("id", "Please enter chat ID").notEmpty(),
  body("name", "Please enter new name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please enter user ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please enter request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please enter secret key").notEmpty(),
];

export {
  registerValidator,
  validateHandler,
  loginValidator,
  newGroupValidator,
  addMemberValidator,
  removeMemberValidator,
  chatIdValidator,
  sendAttachmentsValidator,
  renameValidator,
  sendRequestValidator,
  acceptRequestValidator,
  adminLoginValidator,
};
