import React, { useEffect, useState } from "react";
import { AiOutlineSun } from "react-icons/ai";
import { BsArrowsMove, BsThreeDots } from "react-icons/bs";
import { CiCalendar, CiEdit, CiNoWaitingSign } from "react-icons/ci";
import { GoProjectSymlink } from "react-icons/go";
import { MdOutlineNextWeek, MdOutlineWeekend } from "react-icons/md";
import _ from "../../lib/lib";
import { FaFlag, FaRegWindowRestore } from "react-icons/fa";
import { LuAlarmClock } from "react-icons/lu";
import {
  IoDuplicateOutline,
  IoExtensionPuzzleOutline,
  IoLink,
} from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ref, set } from "firebase/database";
import { db } from "../../../Database/FirebaseConfig";
import { auth } from "../../../Database/FirebaseConfig";

const TaskAction = ({ taskDataa }) => {
  const priorities = _.priorities;
  const [priority, setPriority] = useState([]);

  // todo updatePriority function apply
  const updatePriority = (priorityData) => {
    console.log(priorityData);
    setPriority(priorityData.level);
    const taskRef = ref(
      db,
      `tasks/${auth.currentUser?.uid}/${taskDataa.id}/priority`
    );
    set(taskRef, priorityData.level);
  };
  console.log(priority);

  return (
    <div
      className=" min-w-60 bg-gray-100 p-3 rounded-md text-sm "
      style={{ boxShadow: "0 0 5px 5px rgba(0,0,0,0.1)" }}
    >
      {/* edit top part */}
      <div className="border-b border-b-fontSecondery pb-2 ">
        {/* edit part */}
        <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
          <div className="flex items-center gap-2 ">
            <span className="text-fontSecondery">
              <CiEdit />
            </span>
            <p className="text-fontSecondery">Edit</p>
          </div>
          <p className="text-fontSecondery text-sm">CntlE</p>
        </div>
        {/* go to project part */}
        <div className="flex group items-center justify-between  hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
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
      <div className=" mt-3 ">
        {/* date part */}
        <div className="mt-2 flex flex-col gap-2">
          {/* date text */}
          <div className="flex items-center justify-between ">
            <p className="text-black opacity-80">Date</p>
            <p className="text-fontSecondery text-sm">T</p>
          </div>
          {/* date icons */}
          <div className="flex items-center justify-between">
            <span className="text-2xl text-green-500">
              <CiCalendar />
            </span>
            <span className="text-2xl text-yellow-500">
              <AiOutlineSun />
            </span>
            <span className="text-2xl text-blue-500">
              <MdOutlineWeekend />
            </span>
            <span className="text-2xl text-purple-500">
              <MdOutlineNextWeek />
            </span>
            <span className="text-2xl text-fontSecondery">
              <CiNoWaitingSign />
            </span>
            <span className="text-2xl text-fontSecondery">
              <BsThreeDots />
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
      <div className="border-b border-b-fontSecondery pb-2 pt-2 mt-4 border-t border-t-fontSecondery ">
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
        <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
          <div className="flex items-center gap-2 ">
            <span className="text-fontSecondery">
              <BsArrowsMove />
            </span>
            <p className="text-fontSecondery">Move to</p>
          </div>
          <p className="text-fontSecondery text-sm">V</p>
        </div>
        {/* icon duplicate */}
        <div className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
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
      <div className="flex mt-1.5 group items-center justify-between  cursor-pointer ">
        <div className="flex items-center gap-2 ">
          <span className="text-accentMain">
            <RiDeleteBin6Line />
          </span>
          <p className="text-accentMain">Delete</p>
        </div>
        <p className="text-fontSecondery text-sm">Delete</p>
      </div>
    </div>
  );
};

export default TaskAction;
