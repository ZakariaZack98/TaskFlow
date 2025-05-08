import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import BtnPrimary from "./BtnPrimary";
import DateSelector from "./DateSelector";
import ProjectSelector from "./ProjectSelector";
import PrioritySelector from "./PrioritySelector";
import { push, ref, set } from "firebase/database";
import { auth, db } from "../../../Database/FirebaseConfig";
import { GetMilliseconds, GetTimeNow } from "../../utils/utils";
import { toast } from "react-toastify";

const EditTaskPrompt = ({ taskData, setOpenEditPrompt }) => {
  const [title, setTitle] = useState(taskData?.title || "");
  const [desc, setDesc] = useState(taskData?.desc || "");
  const [date, setDate] = useState(taskData.date);
  const [project, setProject] = useState(taskData.project);
  const [priority, setPriority] = useState(taskData.priority);

  const updateTask = async () => {
    if (title.length === 0) {
      toast.error(`Task with empty title can't be added`);
      return;
    }
    const updatedTask = {
      title,
      desc,
      date,
      project,
      priority,
      id: taskData.id,
      status: "pending",
      deadline: GetMilliseconds(date + ` ${new Date().toString().split(' ')[3]}`),
      createdAt: taskData.createdAt,
    };
    const newActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: 'update',
      taskId: taskData.id,
      taskTitle: title,
      message: 'You have updated task- '
    };
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskData.id}`);
    const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
    try {
      await Promise.all([set(taskRef, updatedTask), push(activityRef, newActivity)]);
      toast.success('Task has been updated successfully')
    } catch (err) {
      toast.error("Error updating task:", err.message);
    } finally {
      setTitle("");
      setDesc("");
      setPriority(3);
      setDate(new Date().toDateString().split(" ").slice(0, 3).join(" "));
      setProject("Personal");
      setOpenEditPrompt(false);
    }
  };

  return (
    <div
      className="relative bg-white w-full  cursor-pointer ps-3 pt-3 pe-3 mb-3 rounded-xl border z-50"
      style={{ boxShadow: "0 0 5px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <span
        className="absolute right-4 top-4 text-accentMain text-3xl"
        onClick={() => setOpenEditPrompt(false)}
      >
        <IoMdCloseCircle />
      </span>
      <input
        type="text"
        placeholder="Task name"
        className="font-semibold w-full focus:outline-0"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        className="text-sm w-full focus:outline-0"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div className="flex justify-between">
        <div className="selectionGroup flex items-center gap-x-2">
          <div className="mx-3">
            <DateSelector date={date} setDate={setDate} />
          </div>
          <ProjectSelector project={project} setProject={setProject} />
          <PrioritySelector priority={priority} setPriority={setPriority} />
        </div>
        <div className=" translate-y-6">
          <BtnPrimary label={"Update Task"} clickHandler={() => updateTask()} />
        </div>
      </div>
    </div>
  );
};

export default EditTaskPrompt;
