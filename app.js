import express from "express";
import userRoute from "./routes/user.route.js";
import { connectDB } from "./utils/features.js";
import { config } from "dotenv";

config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

app.use("/user", userRoute);

app.get("/hello", (req, res) => {
  res.send("Hey there, This is home route");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
