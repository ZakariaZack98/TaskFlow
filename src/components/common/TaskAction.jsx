import React, { useState } from "react";
import { AiOutlineSun } from "react-icons/ai";
import { BsArrowsMove } from "react-icons/bs";
import { CiCalendar, CiEdit, CiHashtag } from "react-icons/ci";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineNextWeek, MdOutlineWeekend } from "react-icons/md";
import _ from "../../lib/lib";
import { FaFlag, FaRegWindowRestore } from "react-icons/fa";
import {
  IoDuplicateOutline,
  IoExtensionPuzzleOutline,
  IoLink,
} from "react-icons/io5";

import { RiDeleteBin6Line } from "react-icons/ri";
import { ref, remove, set, update } from "firebase/database";
import { db } from "../../../Database/FirebaseConfig";
import { auth } from "../../../Database/FirebaseConfig";
import EditTaskPrompt from "./EditTaskPrompt";
import { push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { GetTimeNow, RemoveTask } from "../../utils/utils";
import { toast } from "react-toastify";

const TaskAction = ({ taskDataa, showTaskAction }) => {
  const navigate = useNavigate();
  const projects = _.projects;
  const priorities = _.priorities;
  const [priority, setPriority] = useState([]);
  const [project, setProject] = useState([]);
  const [openEditPrompt, setOpenEditPrompt] = useState(false);
  const [openProjectPopUp, setOpenProjectPopUp] = useState(false);

  // TODO: HANDLE RESCHEDULE BY CLICKING DATE ICONS
  const updateSchedule = (e) => {
    e.stopPropagation();
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskDataa.id}`);
    const activityRef = ref(db, `activity/${auth.currentUser?.uid}`);
    if (e.target.textContent === "today") {
      // set the tasks date (text format) & tasks deadline (milisecond format) to today
      const todayStr = new Date()
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const todayMilliseconds = new Date().setHours(0,0,0,0);
      const NewActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: "reschedule",
        taskId: taskDataa.id,
        taskTitle: taskDataa.title,
        taskDate: todayStr,
        message: `You have rescheduled `,
      };
      Promise.all([
        update(taskRef, { date: todayStr, deadline: todayMilliseconds }),
        push(activityRef, NewActivity),
      ])
        .then(() => {
          toast.success(`Task has been recheduled to Today`);
        })
        .catch((err) => {
          toast.error(`Task  rechedule Failed, ${err.message} `);
        });
      update(taskRef, { date: todayStr, deadline: todayMilliseconds });
    } else if (e.target.textContent === "tomorrow") {
      // set the tasks date (text format) & tasks deadline (milisecond format) to tomorrow
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowStr = tomorrow
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const tomorrowMilliseconds = tomorrow.getTime();
      const NewActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: "reschedule",
        taskId: taskDataa.id,
        taskTitle: taskDataa.title,
        taskDate: tomorrowStr,
        message: `You have rescheduled  `,
      };
      Promise.all([
        update(taskRef, { date: tomorrowStr, deadline: tomorrowMilliseconds }),
        push(activityRef, NewActivity),
      ])
        .then(() => {
          toast.success(`Task has been recheduled to Tomorrow`);
        })
        .catch((err) => {
          toast.error(`Task  rechedule Failed, ${err.message} `);
        });
    } else if (e.target.textContent === "weekend") {
      // set the tasks date (text format) & tasks deadline (milisecond format) to next fridayconst
      const today = new Date();
      const weekend = new Date(today);
      const day = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday
      const daysToFriday = (5 - day + 7) % 7 || 7; //how many days to  friday
      weekend.setDate(today.getDate() + daysToFriday); //to add today and days left for weekend
      const weekendStr = weekend
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const weekendMilliseconds = weekend.getTime();
      const NewActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: "reschedule",
        taskId: taskDataa.id,
        taskTitle: taskDataa.title,
        taskDate: weekendStr,
        message: `You have rescheduled `,
      };
      Promise.all([
        update(taskRef, {
          date: weekendStr,
          deadline: weekendMilliseconds,
        }),
        push(activityRef, NewActivity),
      ])
        .then(() => {
          toast.success(`Task has been recheduled to next friday`);
        })
        .catch((err) => {
          toast.error(`Task  rechedule Failed, ${err.message} `);
        });
    } else if (e.target.textContent === "next week") {
      // set the tasks date (text format) & tasks deadline (milisecond format) to 7 days later from today
      const today = new Date();
      const nextWeekend = new Date(today);
      const day = today.getDay();
      nextWeekend.setDate(today.getDate() + 7);
      const nextWeekendStr = nextWeekend
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const nextWeekendMilliseconds = nextWeekend.getTime();
      const NewActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: "reschedule",
        taskId: taskDataa.id,
        taskTitle: taskDataa.title,
        taskDate: nextWeekendStr,
        message: `You have rescheduled `,
      };
      Promise.all([
        update(taskRef, {
          date: nextWeekendStr,
          deadline: nextWeekendMilliseconds,
        }),
        push(activityRef, NewActivity),
      ])
        .then(() => {
          toast.success(`Task has been recheduled to next week`);
        })
        .catch((err) => {
          toast.error(`Task  rechedule Failed, ${err.message} `);
        });
    }
  };

  // todo updatePriority function apply
  const updatePriority = (priorityData) => {
    const newActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: "update",
      taskId: taskDataa.id,
      taskTitle: taskDataa.title,
      taskPriority: priorityData.level,
      message: `You have updated priority of a task- `,
    };
    setPriority(priorityData.level);
    const taskRef = ref(
      db,
      `tasks/${auth.currentUser?.uid}/${taskDataa.id}/priority`
    );
    const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
    Promise.all([
      set(taskRef, priorityData.level),
      push(activityRef, newActivity),
    ]).then(() => {
      setOpenProjectPopUp(false);
      showTaskAction(false);
      toast.success(`Priority changed to priority ${priorityData.level}`);
    });
  };
  // todo updateProject function apply
  const updateProject = (projectData) => {
    const newActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: "update",
      taskId: taskDataa.id,
      taskTitle: taskDataa.title,
      taskProject: projectData,
      message: `You have re-assigned project of a task- `,
    };
    setProject(projectData);
    const projectRef = ref(
      db,
      `tasks/${auth.currentUser?.uid}/${taskDataa.id}/project`
    );
    const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
    Promise.all([
      set(projectRef, projectData),
      push(activityRef, newActivity),
    ]).then(() => {
      setOpenProjectPopUp(false);
      showTaskAction(false);
      toast.success(`task re-assigned to ${projectData}`);
    });
  };

  // todo apply handleDuplicate

  const handleDuplicate = () => {
    const userTasksRef = ref(db, `tasks/${auth.currentUser?.uid}`);
    const newTaskRef = push(userTasksRef);

    const duplicatedTask = {
      ...taskDataa,
      id: newTaskRef.key,
      createdAt: new Date().toISOString(),
    };

    set(newTaskRef, duplicatedTask);
  };

  return (
    <div className="relative z-50">
      <div className="relative">
        {openEditPrompt && (
          <div className="absolute top-0 -left-[230%] z-50 min-w-450 text-fontSecondery">
            <EditTaskPrompt
              taskData={taskDataa}
              setOpenEditPrompt={setOpenEditPrompt}
            />
          </div>
        )}
      </div>

      {/* main */}
      <div
        className=" min-w-60 bg-gray-100 p-3 rounded-md text-sm"
        style={{ boxShadow: "0 0 5px 5px rgba(0,0,0,0.1)" }}
      >
        {/* edit top part */}
        <div className="border-b border-b-fontSecondery pb-2 ">
          <div
            onClick={() => setOpenEditPrompt(true)}
            className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
          >
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <CiEdit />
              </span>
              <p className="text-fontSecondery">Edit Task</p>
            </div>
          </div>
          <div
            onClick={() => navigate("/project")}
            className="flex group items-center justify-between  hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
          >
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <GoProjectSymlink />
              </span>
              <p className="text-fontSecondery">Go to project</p>
            </div>
          </div>
        </div>
        {/* date and priority */}
        <div className=" flex flex-col border-b border-fontSecondery pb-3">
          {/* date part */}
          <div className="mt-2 flex flex-col">
            <div className="flex items-center justify-between ">
              <p className="text-black opacity-80">Reschedule</p>
            </div>
            <div className="flex items-center justify-between">
              <span className=" text-green-500">
                <CiCalendar
                  className="text-[40px] rounded-md py-1 px-2 hover:bg-[rgba(0,0,0,0.11)] duration-200"
                  title="today"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
              <span className=" text-yellow-500">
                <AiOutlineSun
                  className="text-[40px] rounded-md py-1 px-2 hover:bg-[rgba(0,0,0,0.11)] duration-200"
                  title="tomorrow"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
              <span className=" text-blue-500">
                <MdOutlineWeekend
                  className="text-[40px] rounded-md py-1 px-2 hover:bg-[rgba(0,0,0,0.11)] duration-200"
                  title="weekend"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
              <span className=" text-purple-500">
                <MdOutlineNextWeek
                  className="text-[40px] rounded-md py-1 px-2 hover:bg-[rgba(0,0,0,0.11)] duration-200"
                  title="next week"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
            </div>
          </div>
          {/* priority part */}
          <div className=" flex flex-col ">
            <div className="flex items-center justify-between ">
              <p className="text-black opacity-80">Priority</p>
            </div>
            <div className="flex justify-around items-center gap-7">
              {/* priority  icons */}
              {priorities?.map((priority) => (
                <span
                  onClick={() => updatePriority(priority)}
                  className={`text-xl ${
                    priority.level === 1
                      ? "text-red-500"
                      : priority.level === 2
                      ? "text-orange-500"
                      : priority.level === 3
                      ? "text-green-700"
                      : "text-gray-600"
                  } ${
                    priority.level == taskDataa.priority
                      ? "p-2 border border-gray-300 shadow-sm rounded-lg"
                      : ""
                  }`}
                >
                  <FaFlag />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className=" border-b-fontSecondery  mt-1.5 ">
          {/* icon move */}
          <div
            onClick={() => setOpenProjectPopUp((prev) => !prev)}
            className="flex relative group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
          >
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <BsArrowsMove />
              </span>
              <p className="text-fontSecondery">Move to</p>
            </div>
          </div>
          <div
            onClick={handleDuplicate}
            className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
          >
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <IoDuplicateOutline />
              </span>
              <p className="text-fontSecondery">Duplicate</p>
            </div>
          </div>
          <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <IoLink />
              </span>
              <p className="text-fontSecondery">Copy link</p>
            </div>
          </div>
          <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <FaRegWindowRestore />
              </span>
              <p className="text-fontSecondery">Open in new Window</p>
            </div>
          </div>
        </div>
        <div className="border-b border-b-fontSecondery pb-2 pt-2 mt-1.5 border-t border-t-fontSecondery opacity-50 ">
          <div className="flex items-center gap-2 ">
            <span className="text-fontSecondery">
              <IoExtensionPuzzleOutline />
            </span>
            <p className="text-fontSecondery">Add Extentions</p>
          </div>
        </div>
        <div className="flex mt-1.5 group items-center justify-between   hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
          <div
            onClick={() => RemoveTask(taskDataa)}
            className="flex items-center gap-2 "
          >
            <span className="text-accentMain">
              <RiDeleteBin6Line />
            </span>
            <p className="text-accentMain">Delete</p>
          </div>
        </div>
      </div>
      {/* my project part */}
      {openProjectPopUp && (
        <div
          style={{ boxShadow: "0 0 5px 5px rgba(0,0,0,0.1)" }}
          className="min-w-[90%] bg-gray-100 -left-54 p-3 bottom-30 rounded-md text-sm absolute z-20 "
        >
          <h1 className="text-xl font-semibold">My Projects</h1>
          <div className="flex flex-col gap-y-2 mt-3">
            {projects?.map((project, key) => (
              <div
                onClick={() => updateProject(project)}
                className={`flex items-center group justify-between  hover:bg-gray-200  -ml-3 px-4 py-0.5 rounded-md cursor-pointer ${
                  project == taskDataa.project ? "bg-red-100" : ""
                }`}
              >
                <div
                  onClick={() => updateProject(project)}
                  key={project}
                  className={`flex items-center gap-x-3 mt-1 `}
                >
                  <span
                    className={` text-fontSecondery transition-all text-xl ${
                      project === "Personal"
                        ? "text-blue-500"
                        : project === "Shopping"
                        ? "text-green-500"
                        : project === "Works"
                        ? "text-orange-500"
                        : project === "Errands"
                        ? "text-shadow-cyan-700"
                        : "text-gray-800"
                    } `}
                  >
                    <CiHashtag />
                  </span>
                  <h2 className="group-hover:text-accentMain text-fontSecondery">
                    {project}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAction;
