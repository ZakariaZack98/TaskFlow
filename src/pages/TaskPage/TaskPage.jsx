import React, { useEffect, useState } from "react";
import RoundedCheckbox from "../../components/common/RoundedCheckbox";
import { FaAngleDown, FaLock } from "react-icons/fa6";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import { GrAttachment } from "react-icons/gr";
import BtnPrimary from "../../components/common/BtnPrimary";
import PrioritySelector from "../../components/common/PrioritySelector";
import ProjectSelector from "../../components/common/ProjectSelector";
import DateSelector from "../../components/common/DateSelector";
import _ from "../../lib/lib";
import CommentCard from "../../components/common/CommentCard";
import { GetDateNow } from "../../utils/utils";
import { onValue, ref, update } from "firebase/database";
import { db } from "../../../Database/FirebaseConfig";

const TaskPage = ({ taskData, setOpenTaskPage }) => {
  const [currentTaskData, setCurrentTaskData] = useState({});
  const [showSubTasks, setShowSubTasks] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [subTasks, setSubTasks] = useState(taskData?.subTasks || []);
  const [comments, setComments] = useState(taskData?.comments || []);
  const [project, setProject] = useState(taskData?.project || 'N/A');
  const [priority, setPriority] = useState(taskData?.priority || 'N/A');
  const [date, setDate] = useState(taskData.date || GetDateNow());

  // * FETCHING REAL TIME DATA & UPDATING STATES SO ANY CHANGES DONE CAN BE DISPLAYED REAL TIME ==========
  useEffect(() => {
    const taskRef = ref(db, `tasks/${taskData.id}`)
    const unsubscribe = onValue(taskRef, (taskSnapshot) => {
      if(taskSnapshot.exists()) {
        const updatedData = taskSnapshot.val()
        setCurrentTaskData(updatedData);
        setSubTasks(updatedData.subTasks || []);
        setComments(updatedData.comments || []);
        setProject(updatedData.project || 'Personal');
        setPriority(updatedData.priority || 3)
        setDate(updatedData.date || new Date().toDateString())
      }
    })
    return () => unsubscribe();
  }, [taskData?.id])


  const dummyComments = _.dummyComments;


  const getIconClickHandler = (name) => {
    if (name === 'closePopup') {
      setOpenTaskPage(false);
      console.log('closed');
    }
  };

  const handleUpdateTask = () => {
    const updatedTask = {...currentTaskData};
    updatedTask.subTasks = subTasks;
    updatedTask.comments = comments;
    updatedTask.project = project;
    updatedTask.priority = priority;
    updatedTask.date = date,
    updatedTask.deadline = date,
    console.log(updatedTask)
  }

  return (
    <div className={`absolute top-0 left-0 w-svw h-svh ${''} z-50 text-[16px]`}>
      <div className="backdrop absolute w-svw h-svh bg-[rgba(0,0,0,0.47)]"></div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <div
          className="w-6/10 h-9/10 flex justify-center items-center rounded-xl bg-white "
          style={{ boxShadow: "0 0 10 10 rgba(0, 0, 0, 0.97)" }}>
          <div className="w-[96%] h-[94%]">
            <div className="heading flex justify-between border-b-2 border-accentMain pb-2">
              <div className="left flex items-center">
                <RoundedCheckbox />
                <div className="taskName flex flex-col">
                  <p className="font-semibold text-sm">{currentTaskData?.title || "Take my cat to the vet"}</p>
                  <div className="text-[12px] text-fontSecondery">in {currentTaskData?.category || "Personal"}</div>
                </div>
              </div>
              <div className="iconSec flex items-center gap-x-3">
                {_.taskPageIcons.map(({ name, icon: IconComponent }) => (
                  <span
                    className="text-2xl opacity-50 cursor-pointer hover:text-accentMain"
                    key={name}
                    onClick={() => getIconClickHandler(name)}>
                    <IconComponent />
                  </span>
                ))}
              </div>
            </div>
            <div className="taskBody w-full h-[90%] flex">
              {/* ===================================== LEFT SIDE MARKUP ================================================= */}
              {/* =========================== HEADING PART ================================ */}
              <div className="main h-full w-7/10 p-3 overflow-y-scroll ">
                <h3 className="text-2xl font-semibold text-accentMain">{currentTaskData?.title || "Take my cat to the vet"}</h3>
                <div className="flex items-center gap-x-1">
                  <span className="text-xl">
                    <HiOutlineBars3BottomLeft />
                  </span>
                  <p className="text-sm text-fontSecondery">
                    {currentTaskData?.desc || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo temporea velit."}
                  </p>
                </div>
                {/* ========================== SUB TASKS SECTION ============================= */}
                <div className="subTaskSec mt-3 flex items-center gap-x-1 px-2 text-lg">
                  <span className="text-xl cursor-pointer text-fontSecondery" onClick={() => setShowSubTasks((prev) => !prev)}>
                    {showSubTasks ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold  text-fontSecondery">Sub tasks:</p>
                </div>
                <div
                  className={`${showSubTasks ? "h-fit" : "h-0 opacity-0"
                    } subTaskList mx-3 duration-300 `}>
                  <div className="flex items-center gap-x-1 p-4">
                    <span className="text-xl text-accentMain cursor-pointer">
                      <CiCirclePlus />
                    </span>
                    <p className="text-fontSecondery ">Add sub-task</p>
                    {currentTaskData?.subTasks?.length > 0 && (
                      <span>
                        task: {currentTaskData?.subTasks?.filter((task) => task.status === "complete") || 0} / {subTasks.length}
                      </span>
                    )}
                  </div>
                </div>
                {/* ============================ COMMENT SECTION ================================= */}
                <div className="commentSec flex items-center gap-x-1 px-2">
                  <span className="text-xl cursor-pointer text-fontSecondery" onClick={() => setShowComments((prev) => !prev)}>
                    {showComments ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold py-3 text-md text-fontSecondery">Comments:</p>
                </div>
                <div className={`${showComments ? "h-[100%]" : "h-0 opacity-0"} mx-3 pb-2 duration-300`}>
                  <div className="addComment flex items-center">
                    <div className="flex gap-x-2 my-2">
                      <picture>
                        <img src={`https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png`} className="w-8 h-8 rounded-full bg-cover bg-center" />
                      </picture>
                      <div className="inputField relative w-100">
                        <input type="text" className="px-2 py-1 rounded-xl border-[3px] border-accentMain w-full" />
                        <div className="absolute right-2 top-1/2 -translate-y-[50%] opcaity-40 text-xl cursor-pointer">
                          <GrAttachment />
                        </div>
                      </div>
                      <BtnPrimary label={'Comment'} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-y-1">
                    {
                      currentTaskData?.comments?.map((comment, idx) => <CommentCard key={idx} commentData={comment} />)
                    }
                  </div>
                </div>
              </div>
              {/* ===================================== LEFT SIDE MARKUP ENDS ================================================= */}
              {/* ======================================== SIDEBAR MARKUP STARTS ========================================== */}
              <div className="sidebar h-full w-3/10 bg-sidebarMain p-5 relative">
                <div className="project border-b border-[rgba(0,0,0,0.14)] pb-2">
                  {/* ================================= PROJECT SELECTION ===================================== */}
                  <p className="font-semibold text-sm">Projects</p>
                  <ProjectSelector project={project} setProject={setProject} />
                </div>
                {/* ================================= DATE SELECTION ===================================== */}
                <div className="date cursor-pointer relative" >
                  <p className="text-sm text-secondary translate-y-2" >Date</p>
                  <DateSelector date={date} setDate={setDate} />
                </div>
                {/* ================================= PRIORITY SELECTION ===================================== */}
                <div className="priority border-b border-[rgba(0,0,0,0.16)]">
                  <PrioritySelector priority={priority} setPriority={setPriority} />
                </div>
                {/* ================================= REMINDER ===================================== */}
                <div className="reminder py-4 border-b border-[#00000034]">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Add reminders</p>
                    <span>
                      <FaLock className="text-red-500" />
                    </span>
                  </div>
                </div>
                {/* ================================= LOCATION ===================================== */}
                <div className="reminder py-4 border-b border-[#00000034]">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">Add location</p>
                    <span>
                      <FaLock className="text-red-500" />
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5">
                  <BtnPrimary label={'Update Task'} clickHandler={() => handleUpdateTask()}/>
                </div>
              </div>
            </div>
            {/* ======================================== SIDEBAR MARKUP ENDS================================================= */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
