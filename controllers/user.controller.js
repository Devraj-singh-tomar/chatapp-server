import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

// Create New User and save cookie
export const newUser = async (req, res) => {
  const { name, bio, password, username } = req.body;

  const avatar = {
    public_id: "asdasd",
    url: "kjasd",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "User Created Successfully");
};

// Login User and save cookie
export const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid Username or Password", 404));

  const isPasswordMatched = await compare(password, user.password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid Password", 404));

  sendToken(res, user, 200, `Welcome back, ${user.name}`);
});

export const getMyProfile = async (req, res) => {};
