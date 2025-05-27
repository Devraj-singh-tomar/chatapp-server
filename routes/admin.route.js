import express from "express";
import {
  getAllChats,
  getAllMessages,
  getAllUsers,
} from "../controllers/admin.controller.js";

const app = express.Router();

// app.get("/");

// app.post("/verify");

// app.get("/logout");

app.get("/users", getAllUsers);

app.get("/chats", getAllChats);

app.get("/messages", getAllMessages);

// app.get("/stats");

export default app;
