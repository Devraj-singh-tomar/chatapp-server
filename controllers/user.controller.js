import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { cookieOptions, sendToken } from "../utils/features.js";
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

export const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

export const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;

  return res.status(200).json({
    success: true,
    message: name,
  });
});
