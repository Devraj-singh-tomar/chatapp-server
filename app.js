import express from "express";

const app = express();

const port = 3000;

app.get("/hello", (req, res) => {
  res.send("Hey there, server is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
