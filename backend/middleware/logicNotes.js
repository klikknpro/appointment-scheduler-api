// const currentTimestampHUN = () => {
//   const timestampUTC = new Date().getTime();
//   const offset = new Date().getTimezoneOffset();
//   const timestampHUN = timestampUTC + -1 * (offset * 60 * 1000);
//   return timestampHUN;
// };

// const startTime = currentTimestampHUN();
// const endTime = startTime + 30 * 60 * 1000;

// const dateFormat = new Date(startTime).toLocaleDateString();

/* === /// === */

const now = new Date();
console.log("now:", now);

const inputStart = "2022-05-28T15:05";
const startTime = new Date(inputStart);
console.log("start", startTime);

const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
console.log("end:", endTime);

console.log(now <= startTime);

//

const appointmentDate = startTime.toISOString().split("T")[0]; // save to Mongo
const startTimeToDisplay = startTime.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" }); // convert from Mongo

/*
2022-05-31T04:08:54+00:00
luxon api
*/
