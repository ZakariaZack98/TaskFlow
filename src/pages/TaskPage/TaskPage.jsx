import React, { useState } from "react";
import RoundedCheckbox from "../../components/common/RoundedCheckbox";
import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa6";
import { PiDotsThreeOutline } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { CiCirclePlus } from "react-icons/ci";
import moment from "moment";
import { GrAttachment } from "react-icons/gr";
import BtnPrimary from "../../components/common/BtnPrimary";

const TaskPage = ({ taskData }) => {
  const [showSubTasks, setShowSubTasks] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [subTasks, setSubTasks] = useState([]);
  const [comments, setComments] = useState([]);
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


  const getIconClickHandler = (name) => {};

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
                  <span className="text-xl cursor-pointer" onClick={() => setShowSubTasks((prev) => !prev)}>
                    {showSubTasks ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold text-fontSecondery">Sub tasks:</p>
                </div>
                <div
                  className={`${
                    showSubTasks ? "h-fit" : "h-0 opacity-0"
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
                  <span className="text-xl cursor-pointer" onClick={() => setShowComments((prev) => !prev)}>
                    {showComments ? (
                      <FaAngleDown className="rotate-0 duration-200" />
                    ) : (
                      <FaAngleDown className=" -rotate-90 duration-200" />
                    )}
                  </span>
                  <p className="font-semibold py-3 text-fontSecondery">Comments:</p>
                </div>
                <div className={`${showComments ? "h-fit" : "h-0 opacity-0"} subTaskList mx-3 pb-2 duration-300`}>
                  <div className="addComment flex items-center">
                    <div className="flex gap-x-2 my-2">
                      <picture>
                        <img src={`https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png`} className="w-8 h-8 rounded-full bg-cover bg-center"/>
                      </picture>
                      <div className="inputField relative w-100">
                        <input type="text" className="px-2 py-1 rounded-xl border-[3px] border-accentMain w-full"/>
                        <div className="absolute right-2 top-1/2 -translate-y-[50%] opcaity-40 text-xl cursor-pointer">
                          <GrAttachment/>
                        </div>
                      </div>
                      <BtnPrimary label={'Comment'}/>
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
                                <p className="font-semibold">{ comments?.currentUser || "Sadee MD Zakaria"}</p>
                                <span className="text-sm">{moment(comments?.createdAt).fromNow() || '02:38 PM Today'}</span>
                              </div>
                            </div>
                            <p className="mb-3">{comments?.text || 'Ut ut magna aute eiusmod eiusmod aute non.'}</p>
                            <picture>
                              <img src={comments?.imgUrl || 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D'} alt="" className="rounded-2xl max-w-2/3"/>
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebar h-full w-3/10 bg-sidebarMain p-5">
                <div className="project">
                  <p className="font-semibold text-sm">Projects</p>
                  <div className="flex relative justify-between items-center">

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
