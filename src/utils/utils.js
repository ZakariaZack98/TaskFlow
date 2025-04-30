import moment from "moment";

//* (HELPER) TIME FORMATTER HELPER FUNCTION ======================
export const GetTimeNow = () => {
  return moment().format("MM DD YYYY hh:mm:ss a");
};
export const GetDateNow = () => {
  // return new Date().toDateString()
  return new Date().toDateString().split(" ").slice(0, 3).join(" ");
};

//* (HELPER) FETCH A TASK DATA WITH TASK ID =======================
