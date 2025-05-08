import React, { useState } from "react";
import { PiDotsSixVerticalBold, PiDotsThreeOutline } from "react-icons/pi";
import RoundedCheckbox from "./RoundedCheckbox";
import _ from "../../lib/lib";
import { SlCalender } from "react-icons/sl";
import { GoPencil } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
import { GetDateNow, GetMilliseconds, GetTimeNow, MarkAsComplete, RemoveTask } from "../../utils/utils";
import CalendarPopup from "./CalenderPopup";
import TaskPage from "../../pages/TaskPage/TaskPage";
import { push, ref, set } from "firebase/database";
import { auth, db } from "../../../Database/FirebaseConfig";
import EditTaskPrompt from "./EditTaskPrompt";
import TaskAction from "./TaskAction";
import { toast } from "react-toastify";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

const TaskCard = ({ taskData, boardviewMode, complete }) => {
  const [hover, setHover] = useState(false);
  const [recheduleMode, setRecheduleMode] = useState(false);
  const [_, setDate] = useState(taskData.date);
  const [openTaskPage, setOpenTaskpage] = useState(false);
  const [openEditPrompt, setOpenEditPrompt] = useState(false);
  const [showTaskAction, setShowTaskAction] = useState(false);

  const handleRechedule = async (taskId, selectedDate) => {
    const dateRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskId}/date`);
    const deadlineRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskId}/deadline`);
    const activityRef = ref(db, `activity/${auth.currentUser?.uid}`);
    const NewActivity = {
      createdAt: GetTimeNow(),
      timeStamp: Date.now(),
      type: 'reschedule',
      taskId: taskData.id,
      taskTitle: taskData.title,
      taskDate: selectedDate,
      message: `You have rescheduled a task- `
    }
    try {
      await Promise.all([
        set(dateRef, selectedDate),
        set(deadlineRef, GetMilliseconds(selectedDate + ` ${new Date().toDateString().split(" ")[3]}`)),
        push(activityRef, NewActivity)
      ]);
      toast.success(`Task has been recheduled to ${selectedDate}`)
      console.log("rescheduling successful");
    } catch (error) {
      console.error("Task recheduling failed ", error);
    }
  };

  return (
    <>
      {openTaskPage && (
        <TaskPage taskData={taskData} setOpenTaskPage={setOpenTaskpage} />
      )}
      <div className="relative mt-2 w-full">
        {openEditPrompt && (
          <div className="w-full absolute top-0 left-0">
            <EditTaskPrompt
              taskData={taskData}
              setOpenEditPrompt={setOpenEditPrompt}
            />
          </div>
        )}
        <div
          className="flex justify-between items-start cursor-pointer pb-3"
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >

          <div className="left flex items-start">
            <div className="flex  gap-x-1 ">
              <div className="flex items-start translate-y-1">
                <span className={`text-xl ${hover ? "visible" : "invisible"}`}>
                  <PiDotsSixVerticalBold />
                </span>
                <span onClick={() => MarkAsComplete(taskData)}>
                  {!complete && <RoundedCheckbox />}
                </span>
              </div>
              <div
                className="flex flex-col"
                onClick={() => setOpenTaskpage(true)}
              >
                <div className="flex items-center gap-x-2">
                  <p>{taskData.title}</p>
                  {
                    //? OVERDUE TAG IF DEADLINE HAVE CROSSED ===
                    taskData.deadline <
                    GetMilliseconds(new Date().toDateString()) && !complete && (
                      <span className="text-sm px-1 rounded border-2 border-red-600 text-red-600 font-semibold">
                        overdue
                      </span>
                    )
                  }
                </div>
                <div className="flex justify-start items-center text-sm gap-x-2">
                  <span>
                    <SlCalender />
                  </span>
                  <p className="text-fontSecondery">
                    {GetDateNow() === taskData.date
                      ? "Today"
                      : new Date(new Date().setDate(new Date().getDate() + 1)).toDateString().includes(taskData.date)
                      ? 'Tomorrow'
                      : new Date(new Date().setDate(new Date().getDate() - 1)).toDateString().includes(taskData.date)
                      ? 'Yesterday'
                      : date
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          {
            !complete && (
              <div className="right flex flex-col justify-center items-center">
                <div
                  className={`relative icons flex items-center gap-x-3 text-xl text-fontSecondery ${hover ? "visible" : "invisible"
                    }`}
                >
                  <span
                    className="text-2xl hover:text-accentMain"
                    onClick={() => setOpenEditPrompt((prev) => !prev)}
                  >
                    <GoPencil />
                  </span>
                  <span
                    className={`text-2xl hover:text-accentMain relative `}
                    onClick={() => setRecheduleMode(!recheduleMode)}
                  >
                    <MdOutlineDateRange />
                    <span
                      className={
                        `absolute top-10 -left-50` +
                        (recheduleMode ? " visible" : " invisible")
                      }
                    >
                      <CalendarPopup
                        deadline={taskData?.deadline}
                        onSelect={(selectedDate) => {
                          console.log(selectedDate.toDateString());
                          const selectedDateStr = selectedDate
                            .toDateString()
                            .split(" ")
                            .slice(0, 3)
                            .join(" "); //FORMATTING FOR DATABASE
                          setDate(selectedDateStr);
                          handleRechedule(taskData.id, selectedDateStr);
                        }}
                      />
                    </span>
                  </span>
                  <span className=" hover:text-accentMain">
                    <BsFillTrash3Fill onClick={() => RemoveTask(taskData)} />
                  </span>
                  <span className=" hover:text-accentMain relative">
                    {
                      showTaskAction ? (
                        <IoMdCloseCircleOutline
                          onClick={() => setShowTaskAction((prev) => !prev)}
                        />
                      ) : (
                        <PiDotsThreeOutline
                          onClick={() => setShowTaskAction((prev) => !prev)}
                        />
                      )
                    }
                    {showTaskAction && (
                      <div className={`absolute top-6 -left-55`}>
                        <TaskAction
                          taskDataa={taskData}
                          showTaskAction={setShowTaskAction}
                        />
                      </div>
                    )}
                  </span>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default TaskCard;
