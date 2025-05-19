import express from "express";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
// import {
//   createGroupChats,
//   createMessages,
//   createMessagesInAChat,
//   createSingleChats,
//   createUser,
// } from "./seeders/users.seed.js";

config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

//------------------ Creating seed data -------------------
// createUser(10);
// createGroupChats(5);
// createSingleChats(5);
// createMessagesInAChat("682aab5c10f07896edfa5d39", 45);
// createMessages()

const app = express();

// Middleware's
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/hello", (req, res) => {
  res.send("Hey there, This is home route");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
