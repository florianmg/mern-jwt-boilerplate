const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/boilerplate",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("✅ Database connected");
  }
);

app.listen(5050, () => {
  console.log("✅ Server started");
});

module.exports = app;
