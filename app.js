require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const ruleRoutes = require("./routes/ruleRoutes");
const app = express();

//db connection
require("./models/connectDatabase").connectDatabase();

//logger
const logger = require("morgan");
app.use(logger("tiny"));

//body parser (it needs to write for activating "req.")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/rules", ruleRoutes);

app.listen(
  process.env.PORT,
  console.log(`Server running on port ${process.env.PORT}`)
);
