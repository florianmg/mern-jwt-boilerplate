const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const corsConfig = { credentials: true, origin: "http://localhost:3000" };

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsConfig));

mongoose.connect(
  process.env.DATABASE_LINK,
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

app.use(authRoutes);

module.exports = app;
