import { ref, set } from "firebase/database";
import moment from "moment";
import { auth, db } from "../../Database/FirebaseConfig";

// * (HELPER) EXTRACT MILISECONDS FROM DATE STRING ===============
export const GetMilliseconds = (dateString) => {
  return new Date(dateString).getTime();
}

//* (HELPER) TIME FORMATTER HELPER FUNCTION ======================
export const GetTimeNow = () => {
  return moment().format("MM DD YYYY hh:mm:ss a");
};
export const GetDateNow = () => {
  // return new Date().toDateString()
  return new Date().toDateString().split(" ").slice(0, 3).join(" ");
};

/**
 * TODO: MARK A TASK AS COMPLETED, REMOVE FROM UI, UPDATE ON DATABASE ================================
 * @param {taskId} string containing the completed task's id
 * @return void
 * */ 
export const MarkAsComplete = taskId => {
  const taskStatusRef = ref(db, `tasks/${auth.currentUser.uid}/${taskId}/status`);
  setTimeout(() => {
    set(taskStatusRef, 'completed')
    .then(console.log('Task completed'))
    .catch(console.error)
  }, 700);
}
