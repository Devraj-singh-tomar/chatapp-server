import mongoose from "mongoose";

export const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "ChatAppp" })
    .then((data) => {
      console.log(`connected to ${data.connection.port}`);
    })
    .catch((err) => {
      throw err;
    });
};
