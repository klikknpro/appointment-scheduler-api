const router = require("express").Router();
const Appointment = require("../model/appointment");

router.get("/", async (req, res) => {
  if (!req.query.page || !req.body.date) return res.status(400).send("Missing data from request");
  const { page } = req.query;
  const date = req.body.date;
  // date must be "2022-05-28" format
  const byDate = date ? { date: date } : null;
  const toSkip = page > 1 ? (page - 1) * 10 : 0;

  const query = await Appointment.find(byDate).skip(toSkip).limit(10).sort("startTime");
  if (!query) return res.sendStatus(500);
  if (query.length === 0) return res.status(404).send("No appointments on this day");

  res.status(200).json(query);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (id.length !== 24) return res.status(400).send("Invalid ID");

  const appointment = await Appointment.findById(id);
  if (!appointment) return res.status(404).send("Appointment not found");

  res.status(200).json(appointment);
});

router.post("/", async (req, res) => {
  const { start, comment } = req.body; // input format: "2022-05-28T15:05"
  if (!start || start.length !== 16) return res.status(400).send("Start time is missing or invalid");

  const now = new Date();
  const startTime = new Date(start);
  if (startTime < now) return res.status(400).send("Start time is already past");

  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  const date = startTime.toISOString().split("T")[0]; // for the DB only

  // lets find a colliding appointment
  const appointmentsToday = await Appointment.find({ date: date });
  for (const app of appointmentsToday) {
    if (startTime >= app.startTime && startTime < app.endTime) {
      return res.status(400).send("This (start)time is already booked");
    } else if (endTime > app.startTime && endTime <= app.endTime) {
      return res.status(400).send("This (end)time is already booked");
    }
  }

  const newAppointment = new Appointment({
    date,
    startTime,
    endTime,
    comment,
  });
  newAppointment
    .save()
    .then((data) => {
      return res.status(200).json({ data });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

router.patch("/:id", async (req, res) => {
  const { start, comment } = req.body; // input format: "2022-05-28T15:05"
  if (!start || start.length !== 16) return res.status(400).send("Start time is missing or invalid");

  const id = req.params.id;
  if (id.length !== 24) return res.status(400).send("Invalid ID");

  const originalAppointment = await Appointment.findById(id);
  if (!originalAppointment) return res.status(404).send("Appointment not found");

  const now = new Date();
  const startTime = new Date(start);
  if (startTime < now) return res.status(400).send("Start time is already past");

  const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
  const date = startTime.toISOString().split("T")[0];

  // the new modified appointment must be different in a minimum of 30 min step
  const appointmentsToday = await Appointment.find({ date: date });
  for (const app of appointmentsToday) {
    if (startTime >= app.startTime && startTime < app.endTime) {
      return res.status(400).send("This time is already booked");
    } else if (endTime > app.startTime && endTime <= app.endTime) {
      return res.status(400).send("This time is already booked");
    }
  }

  const modifiedAppointment = await Appointment.findOneAndUpdate(
    { _id: id },
    {
      date,
      startTime,
      endTime,
      comment,
    },
    { new: true }
  );
  if (!modifiedAppointment) return res.status(500).send("Database error");

  res.status(200).json({ modifiedAppointment });
});

router.delete("/:id", async (req, res) => {
  // delete appointment
});

module.exports = router;

/*

*/
