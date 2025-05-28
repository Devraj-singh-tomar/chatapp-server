import express from "express";
import {
  adminLogin,
  adminLogout,
  getAllChats,
  getAllMessages,
  getAllUsers,
  getDashboardStats,
} from "../controllers/admin.controller.js";

import { adminLoginValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();

// app.get("/");

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

app.get("/users", getAllUsers);

app.get("/chats", getAllChats);

app.get("/messages", getAllMessages);

app.get("/stats", getDashboardStats);

export default app;
