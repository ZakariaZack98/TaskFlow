import React, { useState } from "react";
import RoundedCheckbox from "../../components/common/RoundedCheckbox";
import { FaAngleDown, FaAngleRight, FaAngleUp, FaFlag } from "react-icons/fa6";
import { PiDotsThreeOutline } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { CiCalendarDate, CiCirclePlus, CiHashtag } from "react-icons/ci";
import moment from "moment";
import { GrAttachment } from "react-icons/gr";
import BtnPrimary from "../../components/common/BtnPrimary";
import { useNavigate } from "react-router-dom";
import CalendarPopup from "../../components/common/CalenderPopup";
import { FiPlusCircle } from "react-icons/fi";

const TaskPage = ({ taskData }) => {
  const navigate = useNavigate();
  const [showSubTasks, setShowSubTasks] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [subTasks, setSubTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [project, setProject] = useState('Personal');
  const [openProjects, setOpenProjects] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);
  const icons = [
    {
      name: "prevTask",
      icon: FaAngleUp,
    },
    {
      name: "nextTask",
      icon: FaAngleDown,
    },
    {
      name: "options",
      icon: PiDotsThreeOutline,
    },
    {
      name: "closePopup",
      icon: AiOutlineClose,
    },
  ];

  const projects = [
    {
      id: 1,
      icon: <CiHashtag />,
      name: "Personal",
      path: "/personal",
      color: "blue"
    },
    {
      id: 2,
      icon: <CiHashtag />,
      name: "Shopping",
      path: "/shopping",
      color: "magenta"
    },
    {
      id: 3,
      icon: <CiHashtag />,
      name: "Works",
      path: "/works",
      color: "orange"
    },
    {
      id: 4,
      icon: <CiHashtag />,
      name: "Errands",
      path: "/errands",
      color: 'brown'
    },
  ];

  const getIconClickHandler = (name) => { };

  return (
    <div className="absolute top-0 left-0 w-svw h-svh ">
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
                  <p className="font-semibold text-sm">{taskData?.title || "Take my cat to the vet"}</p>
                  <div className="text-[12px] text-fontSecondery">in {taskData?.category || "Personal"}</div>
                </div>
              </div>
              <div className="iconSec flex items-center gap-x-3">
                {icons.map(({ name, icon: IconComponent }) => (
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
              <div className="main h-full w-7/10 p-3 overflow-y-scroll ">
                <h3 className="text-xl font-semibold text-accentMain">{taskData?.title || "Take my cat to the vet"}</h3>
                <div className="flex items-center gap-x-1">
                  <span className="text-xl">
                    <HiOutlineBars3BottomLeft />
                  </span>
                  <p className="text-sm text-fontSecondery">
                    {taskData?.desc || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo temporea velit."}
                  </p>
                </div>
                <div className="subTaskSec mt-3 flex items-center gap-x-1 px-2 ">
                  <span className="text-xl cursor-pointer text-fontSecondery" onClick={() => setShowSubTasks((prev) => !prev)}>
                    {showSubTasks ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold text-fontSecondery">Sub tasks:</p>
                </div>
                <div
                  className={`${showSubTasks ? "h-fit" : "h-0 opacity-0"
                    } subTaskList mx-3 duration-300 `}>
                  <div className="flex items-center gap-x-1 p-4">
                    <span className="text-xl text-accentMain cursor-pointer">
                      <CiCirclePlus />
                    </span>
                    <p className="text-fontSecondery">Add sub-task</p>
                    {subTasks.length > 0 && (
                      <span>
                        task: {subTasks?.filter((task) => task.status === "complete") || 0} / {subTasks.length}
                      </span>
                    )}
                  </div>
                </div>
                <div className="commentSec flex items-center gap-x-1 px-2">
                  <span className="text-xl cursor-pointer text-fontSecondery" onClick={() => setShowComments((prev) => !prev)}>
                    {showComments ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold py-3 text-fontSecondery">Comments:</p>
                </div>
                <div className={`${showComments ? "h-[100%]" : "h-0 opacity-0"} subTaskList mx-3 pb-2 duration-300`}>
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
                  <div className="flex items-center gap-x-1">
                    <div className="comment px-4 pb-2">
                      <div className="heading flex justify-between items-center">
                        <div className="flex gap-x-4">
                          <picture>
                            <img
                              src={
                                comments?.imgUrl ||
                                "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                              }
                              className="w-10 h-10 rounded-full object-cover object-center"
                            />
                          </picture>
                          <div className="commentSec">
                            <div className="userSec">
                              <div className="flex items-center gap-x-4">
                                <p className="font-semibold">{comments?.currentUser || "Sadee MD Zakaria"}</p>
                                <span className="text-sm">{moment(comments?.createdAt).fromNow() || '02:38 PM Today'}</span>
                              </div>
                            </div>
                            <p className="mb-3 text-fontSecondery">{comments?.text || 'Ut ut magna aute eiusmod eiusmod aute non.'}</p>
                            <picture>
                              <img src={comments?.imgUrl || 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D'} alt="" className="rounded-2xl max-w-2/3" />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebar h-full w-3/10 bg-sidebarMain p-5 ">
                <div className="project border-b border-[rgba(0,0,0,0.14)] pb-2">
                  <p className="font-semibold text-sm">Projects</p>
                  <div className=" relative ">
                    <div className="active flex justify-between items-center py-2 px-4 my-2 rounded-md bg-focusMain cursor-pointer" onClick={() => setOpenProjects(prev => !prev)}>
                      <div className="flex gap-x-1 text-sm">
                        <span className="text-xl text-blue-700">
                          <CiHashtag />
                        </span>
                        <span>Personal</span>
                      </div>
                      <span>
                        <FaAngleDown />
                      </span>
                    </div>
                    {
                      openProjects && (
                        <div className="absolute w-full left-0 top-10 p-2 rounded-md bg-white z-10" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)' }}>
                          <input type="text" className="px-3 py-1 border-2 border-accentMain rounded w-full" placeholder="Enter a project type..." />
                          <p className="my-2 font-semibold">My Projects</p>
                          {
                            projects.map(project => (
                              <div key={project.name} className="active flex justify-between items-center py-2 px-4 my-2 cursor-pointer hover:bg-[#cecece] rounded-md" onClick={() => navigate(project.path)}>
                                <div className="flex gap-x-1 text-sm">
                                  <span className={`text-xl`} style={{ color: project.color }}>
                                    <CiHashtag />
                                  </span>
                                  <span className="text-fontSecondery">{project.name}</span>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
                <div className="date cursor-pointer relative" onClick={() => setOpenDate(prev => !prev)}>
                  <p className="text-sm text-secondary translate-y-2">Date</p>
                  <div className="flex gap-x-2 items-center py-4 border-b border-[rgba(0,0,0,0.19)]">
                    <span>
                      <CiCalendarDate />
                    </span>
                    <span className="text-sm text-secondary">Today</span>
                  </div>
                  {
                    openDate && (
                      <div className="absolute top-18 left-0 w-full">
                        <CalendarPopup />
                      </div>
                    )
                  }
                </div>
                <div className="priority border-b border-[rgba(0,0,0,0.16)]">
                  <div className="active flex justify-between items-center py-2 px-4 rounded-md bg-focusMain cursor-pointer my-5 " onClick={() => setOpenPriority(prev => !prev)}>
                    <div className="flex gap-x-1 text-sm">
                      <span className="text-xl text-blue-700">
                        <FaFlag />
                      </span>
                      <span>Priority 3</span>
                    </div>
                    <span>
                      <FaAngleDown />
                    </span>
                  </div>
                  {
                    openPriority && (
                      <div className="relative left-0 top-0 rounded-md p-2 bg-white z-10" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)' }}>
                        {
                          ['red', 'orange', 'blue', 'green'].map((color, idx) => (
                            <div className="active flex justify-between items-center py-2 px-4 my-2 rounded-md  cursor-pointer hover:bg-[#e6e6e6]" onClick={() => setOpenPriority(prev => !prev)}>
                              <div className="flex gap-x-1 text-sm">
                                <span className={`text-xl`} style={{ color: color }}>
                                  <FaFlag />
                                </span>
                                <span>Priority {idx + 1}</span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
                <div className="reminder py-4 border-b border-[#00000034]">
                  <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">Add reminders</p>
                  <span>
                    <FiPlusCircle/>
                  </span>
                  </div>
                </div>
                <div className="reminder py-4 border-b border-[#00000034]">
                  <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">Add location</p>
                  <span>
                    <FiPlusCircle/>
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
