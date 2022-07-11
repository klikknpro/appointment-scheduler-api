const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

const corsOptions = {
  origin: process.env.APP_URL, // localhost for FE!
  optionsSuccessStatus: 200,
};

morgan.token("host", function (req, res) {
  return req.hostname;
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan(":method :url :status - HOST: :host  - :response-time ms"));

// routes
const appointmentRouter = require("./route/appointment");
app.use("/api/appointments", appointmentRouter);

app.get("/", (req, res) => {
  console.log("Health check completed");
  res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;

/*

*/
