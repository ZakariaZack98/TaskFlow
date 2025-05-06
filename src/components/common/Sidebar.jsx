import React, { useContext, useEffect, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiCheckboxChecked } from "react-icons/bi";
import { BsBell, BsGraphUpArrow } from "react-icons/bs";
import { CiBellOn, CiEdit, CiGift, CiHashtag, CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import { SlCalender, SlLogout } from "react-icons/sl";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import { onValue, ref, remove } from "firebase/database";
import { auth, db } from "../../../Database/FirebaseConfig";

import _ from "../../lib/lib";
import AddTaskPrompt from "../common/AddTaskPrompt";
import { LuAlarmClock } from "react-icons/lu";
import {
  IoDiamondOutline,
  IoExtensionPuzzleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { signOut } from "firebase/auth";
import { GetMilliseconds } from "../../utils/utils";

const Sidebar = ({
  userName = auth.currentUser?.displayName || "N/A",
  imgUrl = auth?.currentUser?.photoURL ||
    "https://images.pexels.com/photos/31630076/pexels-photo-31630076/free-photo-of-historic-street-scene-in-lisbon-with-cobblestones.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  category = [],
}) => {
  const todayMs = GetMilliseconds(new Date().toDateString());
  const projects = _.projects;
  const { allTaskData, setAllTaskData } = useContext(TaskContext);
  const [openProfilePopUp, setOpenProfilePopUp] = useState(false);

  /**
   * TODO: FETCH ALL TASKS DATA FROM THE DATABASE AFTER USER AUTHENTICATION ==============
   * @param {userId} string containing user id
   * @returns {Array} containing all tasks data
   * */
  useEffect(() => {
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}`);
    const unsubscribe = onValue(taskRef, (snapshot) => {
      const taskArr = [];
      if (snapshot.exists()) {
        snapshot.forEach((taskSnapshot) => {
          taskArr.push(taskSnapshot.val());
        });
      }
      setAllTaskData(taskArr.sort((a, b) => b.id - a.id).filter(task => task.status === 'pending')); //* descending pending tasks from latest to oldest added task
    });
    return () => unsubscribe();
  }, [db]);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const navList = [
    {
      id: 2,
      name: "Inbox",
      icon: <GoInbox />,
      path: "/",
      msg: allTaskData.length,
    },
    {
      id: 3,
      name: "Today",
      icon: <MdOutlineCalendarToday />,
      path: "/today",
      msg: allTaskData.filter(task => task.deadline === todayMs).length,
    },
    {
      id: 4,
      name: "Upcoming",
      icon: <SlCalender />,
      path: "/upcoming",
      msg: allTaskData.filter(task => task.deadline > todayMs).length,
    },
    {
      id: 5,
      name: "Filters & Labels",
      icon: <AiOutlineAppstoreAdd />,
      path: "/filters&labels",
      msg: 4,
    },
  ];
  // todo handleLogOut function apply
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("signin");
        console.log("User signed out.");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
      });
  };
  return (
    <div className="w-1/5 h-full bg-sidebarMain p-5 relative shadow-xl">
      {/* profile part start */}
      <div className="flex justify-between">
        <div
          onClick={() => setOpenProfilePopUp((prev) => !prev)}
          className="left flex items-center gap-x-1.5 cursor-pointer"
        >
          <div className="w-[30px] h-[30px] rounded-full ">
            <img
              className="w-full h-full object-cover rounded-full"
              src={imgUrl}
              alt="jd"
            />
          </div>
          <h2 className="text-xl">{userName}</h2>
          <span>
            <FaAngleDown />
          </span>
        </div>
        <div className="right flex items-center gap-x-3">
          <span>
            <BsBell />
          </span>
          <span>
            <VscLayoutSidebarLeftOff />
          </span>
        </div>
      </div>
      {/* profile popup */}
      {openProfilePopUp && (
        <div
          className=" min-w-[90%] bg-gray-100 p-3 rounded-md text-sm absolute z-20 "
          style={{ boxShadow: "0 0 5px 5px rgba(0,0,0,0.1)" }}
        >
          {/* name part */}
          <div className="border-b border-b-fontSecondery pb-2 ">
            {/* name part */}
            <div
              onClick={() => navigate("/profile")}
              className="flex group items-center justify-between hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
            >
              <div className="flex items-center gap-2 ">
                <span className="text-fontSecondery text-xl">
                  <BsGraphUpArrow />
                </span>
                <div>
                  <h2 className="text-fontSecondery font-medium text-[14px]">
                    {auth.currentUser.displayName}
                  </h2>
                  <p className="text-fontSecondery">0/5 Tasks</p>
                </div>
              </div>
              <p className="text-fontSecondery text-sm">O then P</p>
            </div>
            {/* notification part */}
          </div>

          {/* notification */}
          <div
            onClick={() => navigate("/notification")}
            className="border-b border-b-fontSecondery pb-2  mt-2  "
          >
            <div className="flex items-center gap-2 hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer ">
              <span className="text-fontSecondery text-xl">
                <CiBellOn />
              </span>
              <p className="text-fontSecondery text-[15px]">Notifications</p>
            </div>
            {/* whats new */}
            <div className="flex items-center gap-2 hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer">
              <span className="text-fontSecondery text-xl">
                <CiGift />
              </span>
              <p className="text-fontSecondery text-[15px]">What's New</p>
            </div>
          </div>
          {/* pro */}
          <div className="border-b border-b-fontSecondery  px-1 p-0.5 mt-1 hover:bg-gray-200   mb-1.5 rounded cursor-pointer ">
            <div className="flex items-center gap-2 mb-1">
              <span className=" text-yellow-400 text-xl">
                <IoDiamondOutline />
              </span>
              <p className="text-fontSecondery text-[15px]">Upgrade Pro</p>
            </div>
          </div>

          {/* log out */}
          <div className=" mt-2 hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer  ">
            <div onClick={handleLogOut} className="flex items-center gap-2 ">
              <span className="text-fontSecondery text-xl">
                <SlLogout />
              </span>
              <p className="text-fontSecondery text-[15px]">Log Out</p>
            </div>
          </div>
        </div>
      )}

      {/* item part */}
      <div>
        {/* profile part end */}
        {/* add task part start */}
        <AddTaskPrompt />
        {/* add task part end */}
        {/* nav list part start */}
        <div className="flex flex-col gap-y-2 mt-4">
          {navList?.map((item, index) => (
            <div
              onClick={() => navigate(item?.path)}
              key={item?.id}
              className={`flex group items-center hover:bg-gray-200  justify-between -ml-3 px-4 py-1 rounded-md cursor-pointer
              ${path === item?.path ? "bg-focusMain  " : ""}
            `}
            >
              <div className="flex items-center gap-x-3  ">
                <span className="group-hover:text-accentMain text-fontSecondery transition-all text-2xl">
                  {item?.icon}
                </span>

                <h2 className="group-hover:text-accentMain text-fontSecondery">
                  {item?.name}
                </h2>
              </div>
              <p className="text-[12px] text-gray-400 group-hover:text-accentMain">
                {item?.msg}
              </p>
            </div>
          ))}
        </div>
        {/* nav list part end */}

        {/* my project part start */}
        <div className="mt-8 ">
          <h1 className="text-xl font-semibold">My Projects</h1>
          <div className="flex flex-col gap-y-2 mt-3">
            {projects?.map((project) => (
              <div
                onClick={() => navigate(`/projects/${project}`)}
                className="flex items-center group justify-between  hover:bg-gray-200  -ml-3 px-4 py-0.5 rounded-md cursor-pointer"
              >
                <div key={project} className="flex items-center gap-x-3 mt-1 ">
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
                    }`}
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
        {/* my project part endd */}
      </div>
    </div>
  );
};

export default Sidebar;
