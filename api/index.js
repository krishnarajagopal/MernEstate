import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDBLocal!!");
  })
  .catch((err) => {
    console.log(err);
  });

//use express and express json
  const app = express();
app.use(express.json());

// Listen @ port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000 ...");
});

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);


// Error Handling Middleware
app.use((err, req, res, next) => {
  const statuscode = err.statusCode ? err.statusCode : 500;
  const message = err.message ? err.message : "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});
