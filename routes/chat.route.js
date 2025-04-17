import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChats, newGroupChat } from "../controllers/chat.controller.js";

const app = express.Router();

// After here user must be logged in to access route

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);

export default app;
