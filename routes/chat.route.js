import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChats,
  getMyGroups,
  newGroupChat,
  removeMembers,
} from "../controllers/chat.controller.js";

const app = express.Router();

// After here user must be logged in to access route

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemembers", removeMembers);

export default app;
