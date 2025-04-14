import express from "express";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import { createUser } from "./seeders/users.seed.js";

config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

// user seed data
// createUser(10);

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
