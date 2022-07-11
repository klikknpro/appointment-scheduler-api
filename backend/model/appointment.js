const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: Object,
    required: true,
  }, // Date object (GMT)
  endTime: {
    type: Object,
    required: true,
  }, // Date object (GMT)
  comment: {
    type: String,
    required: false,
  },
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;

/*

*/
