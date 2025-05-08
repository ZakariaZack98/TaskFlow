import { push, ref, remove, set } from "firebase/database";
import moment from "moment";
import { auth, db } from "../../Database/FirebaseConfig";
import { toast } from "react-toastify";

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
 * @param {task} object defining the task
 * @return void
 * */ 
export const MarkAsComplete = task => {
  const taskStatusRef = ref(db, `tasks/${auth.currentUser.uid}/${task.id}/status`);
  const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
  const newActivity = {
    createdAt: GetTimeNow(),
    timeStamp: Date.now(),
    type: 'completion',
    taskId: task.id,
    taskTitle: task.title,
    message: `You have completed `
  }
  setTimeout(() => {
    Promise.all([set(taskStatusRef, 'completed'), push(activityRef, newActivity)])
    .then(() => {
      toast.success('Task marked as complete');
    })
    .catch(console.error)
  }, 700);
}

/**
 * TODO: DELETE A TASK FROM DATABASE ===================================================================
 * @param {task} object defining the task
 * @return void
 * */ 
  export const RemoveTask = task => {
    const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${task.id}`);
    const newActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: 'delete',
      taskId: task.id,
      taskTitle: task.title,
      message: `You have deleted a task- `
    }
    Promise.all([remove(taskRef), push(activityRef, newActivity)])
    .then(() => {
      toast.warning('Task has been deleted')
    })
    .catch(error => toast.error('Error deleting task', error))
  };