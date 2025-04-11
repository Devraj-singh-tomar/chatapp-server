import express from "express";
import userRoute from "./routes/user.route.js";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

// Middleware's
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);

app.get("/hello", (req, res) => {
  res.send("Hey there, This is home route");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
