const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/user", authRouter);
app.use("/api/chats", chatRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
  res.status(200);
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port number: ${PORT}`);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });
