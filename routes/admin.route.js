import express from "express";
import {
  adminData,
  adminLogin,
  adminLogout,
  getAllChats,
  getAllMessages,
  getAllUsers,
  getDashboardStats,
} from "../controllers/admin.controller.js";

import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);

app.get("/logout", adminLogout);

// ONLY ADMIN CAN ACCESS THESE ROUTES
app.use(adminOnly);

app.get("/", adminData);

app.get("/users", getAllUsers);

app.get("/chats", getAllChats);

app.get("/messages", getAllMessages);

app.get("/stats", getDashboardStats);

export default app;
