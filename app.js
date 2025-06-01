import express from "express";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import adminRoute from "./routes/admin.route.js";

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
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "asdasasgdasdasd";
export const userSocketIDs = new Map();

connectDB(mongoURI);

//------------------ Creating seed data -------------------
// createUser(10);
// createGroupChats(5);
// createSingleChats(5);
// createMessagesInAChat("682aab5c10f07896edfa5d39", 45);
// createMessages()

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Middleware's
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/admin", adminRoute);

app.get("/hello", (req, res) => {
  res.send("Hey there, This is home route");
});

io.use((socket, next) => {});

io.on("connection", (socket) => {
  const user = {
    _id: "asdfeq",
    name: "John",
  };

  userSocketIDs.set(user._id.toString(), socket.id);

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);

    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    // console.log("New message", messageForRealTime);

    try {
      await Message.create(messageForDB);
    } catch (error) {
      throw new Error(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id);
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`server is running on port ${port} in ${envMode} mode`);
});
