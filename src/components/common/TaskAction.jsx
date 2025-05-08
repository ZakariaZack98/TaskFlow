import React, { useEffect, useState } from "react";
import { AiOutlineSun } from "react-icons/ai";
import { BsArrowsMove, BsThreeDots } from "react-icons/bs";
import { CiCalendar, CiEdit, CiHashtag, CiNoWaitingSign } from "react-icons/ci";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineNextWeek, MdOutlineWeekend } from "react-icons/md";
import _ from "../../lib/lib";
import { toast } from "react-toastify";
import { FaFlag, FaRegWindowRestore } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
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
import MyProject from "./MyProject";
import { useNavigate } from "react-router-dom";
import { GetTimeNow } from "../../utils/utils";

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

      const today = new Date();
      const todayMilliseconds = today.getTime();
      const NewActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: "reschedule",
        taskId: taskDataa.id,
        taskTitle: taskDataa.title,
        taskDate: todayStr,
        message: `You have rescheduled a task- `,
      };
      Promise.all([
        update(taskRef, { date: todayStr, deadline: todayMilliseconds }),
        push(activityRef, NewActivity),
      ]).then(() => {
        toast.success(`Task has been recheduled to `);
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
      console.log(tomorrowMilliseconds);
      const NewActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: "reschedule",
        taskId: taskDataa.id,
        taskTitle: taskDataa.title,
        taskDate: tomorrowStr,
        message: `You have rescheduled a task- `,
      };
      Promise.all([
        update(taskRef, { date: tomorrowStr, deadline: tomorrowMilliseconds }),
        push(activityRef, NewActivity),
      ]);
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
        message: `You have rescheduled a task- `,
      };
      Promise.all([
        update(taskRef, {
          date: weekendStr,
          deadline: weekendMilliseconds,
        }),
        push(activityRef, NewActivity),
      ]);
    } else if (e.target.textContent === "next week") {
      // set the tasks date (text format) & tasks deadline (milisecond format) to 7 days later from today

      const today = new Date();
      const nextWeekend = new Date(today);

      const day = today.getDay();
      const daysToNextFriday = ((5 - day + 7) % 7 || 7) + 7; // +7 for next weekend

      nextWeekend.setDate(today.getDate() + daysToNextFriday);

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
        message: `You have rescheduled a task- `,
      };
      Promise.all([
        update(taskRef, {
          date: nextWeekendStr,
          deadline: nextWeekendMilliseconds,
        }),
        push(activityRef, NewActivity),
      ]);
    }
    /**
     * ? NOTE: if you call GetMiliSeconds('Tuesday 6 May 2025') you will get miliseconds of 6th May. The arg's date format should be same as New Date().toDateString()'s format
     * */
  };

  // todo updatePriority function apply
  const updatePriority = (priorityData) => {
    setPriority(priorityData.level);
    const taskRef = ref(
      db,
      `tasks/${auth.currentUser?.uid}/${taskDataa.id}/priority`
    );
    set(taskRef, priorityData.level);
    setOpenProjectPopUp(false);
    showTaskAction(false);
  };
  // todo updateProject function apply
  const updateProject = (projectData) => {
    setProject(projectData);
    const projectRef = ref(
      db,
      `tasks/${auth.currentUser?.uid}/${taskDataa.id}/project`
    );
    set(projectRef, projectData);
    setOpenProjectPopUp(false);
    showTaskAction(false);
  };

  // todo removeTask function apply
  const removeTask = () => {
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskDataa.id}`);
    remove(taskRef);
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
    <div>
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
          {/* edit part */}
          <div
            onClick={() => setOpenEditPrompt((prev) => !prev)}
            className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
          >
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <CiEdit />
              </span>
              <p className="text-fontSecondery">Edit</p>
            </div>
            <p className="text-fontSecondery text-sm">CntlE</p>
          </div>
          {/* go to project part */}
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
            <p className="text-fontSecondery text-sm">↑G</p>
          </div>
        </div>
        {/* date and priority */}
        <div className=" mt-3 flex flex-col gap-y-2">
          {/* date part */}
          <div className="mt-2 flex flex-col gap-y-2">
            {/* date text */}
            <div className="flex items-center justify-between ">
              <p className="text-black opacity-80">Date</p>
              <p className="text-fontSecondery text-sm">T</p>
            </div>
            {/* date icons */}
            <div className="flex items-center justify-between">
              <span className="text-2xl text-green-500">
                <CiCalendar
                  className="text-3xl"
                  title="today"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
              <span className="text-2xl text-yellow-500">
                <AiOutlineSun
                  className="text-3xl"
                  title="tomorrow"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
              <span className="text-2xl text-blue-500">
                <MdOutlineWeekend
                  className="text-3xl"
                  title="weekend"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
              <span className="text-2xl text-purple-500">
                <MdOutlineNextWeek
                  className="text-3xl"
                  title="next week"
                  onClick={(e) => updateSchedule(e)}
                />
              </span>
            </div>
          </div>
          {/* priority part */}
          <div className="mt-2 flex flex-col gap-3">
            {/* date text */}
            <div className="flex items-center justify-between ">
              <p className="text-black opacity-80">Priority</p>
              <p className="text-fontSecondery text-sm">Y</p>
            </div>
            <div className="flex  items-center gap-7">
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
        {/* reminders */}
        <div className="border-b border-b-fontSecondery pb-2 pt-2 mt-4 border-t border-t-fontSecondery hover:bg-gray-200   px-1  rounded cursor-pointer">
          <div className="flex items-center gap-2 ">
            <span className="text-fontSecondery">
              <LuAlarmClock />
            </span>
            <p className="text-fontSecondery">Reminders</p>
          </div>
        </div>
        {/* icons part */}
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
            <p className="text-fontSecondery text-sm">V</p>
          </div>
          {/* icon duplicate */}
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
            <p className="text-fontSecondery text-sm">cntl c</p>
          </div>
          {/* copy link */}
          <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <IoLink />
              </span>
              <p className="text-fontSecondery">Copy link</p>
            </div>
            <p className="text-fontSecondery text-sm">C</p>
          </div>
          {/* new window */}
          <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
            <div className="flex items-center gap-2 ">
              <span className="text-fontSecondery">
                <FaRegWindowRestore />
              </span>
              <p className="text-fontSecondery">Open in new Window</p>
            </div>
            <p className="text-fontSecondery text-sm">A</p>
          </div>
        </div>
        {/* extention */}
        <div className="border-b border-b-fontSecondery pb-2 pt-2 mt-1.5 border-t border-t-fontSecondery  ">
          <div className="flex items-center gap-2 ">
            <span className="text-fontSecondery">
              <IoExtensionPuzzleOutline />
            </span>
            <p className="text-fontSecondery">Add Extentions</p>
          </div>
        </div>
        {/* delete */}
        <div className="flex mt-1.5 group items-center justify-between   hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
          <div onClick={removeTask} className="flex items-center gap-2 ">
            <span className="text-accentMain">
              <RiDeleteBin6Line />
            </span>
            <p className="text-accentMain">Delete</p>
          </div>
          <p className="text-fontSecondery text-sm">Delete</p>
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
