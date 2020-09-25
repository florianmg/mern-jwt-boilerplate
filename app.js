const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();
const corsConfig = { credentials: true, origin: process.env.FRONT_ENDPOINT };

app.use(
  cookieParser(process.env.COOKIE_SECRET, {
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    path: process.env.COOKIE_PATH,
    maxAge: process.env.COOKIE_MAX_AGE,
  })
);
app.use(express.json());
app.use(cors(corsConfig));

mongoose.connect(
  process.env.DATABASE_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("✅ Database connected");
  }
);

app.listen(process.env.PORT, () => {
  console.log("✅ Server started");
});

app.use(authRoutes);

module.exports = app;
