import React, { useContext, useEffect, useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsBell, BsGraphUpArrow } from "react-icons/bs";
import { CiGift, CiHashtag} from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { MdAutoGraph, MdOutlineCalendarToday } from "react-icons/md";
import { SlCalender, SlLogout } from "react-icons/sl";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import { onValue, ref, remove } from "firebase/database";
import { auth, db } from "../../../Database/FirebaseConfig";

import _ from "../../lib/lib";
import AddTaskPrompt from "../common/AddTaskPrompt";
import {
  IoDiamondOutline,
} from "react-icons/io5";
import { signOut } from "firebase/auth";
import { GetMilliseconds } from "../../utils/utils";
import { FaRegCircleCheck } from "react-icons/fa6";

const Sidebar = ({}) => {
  const todayMs = GetMilliseconds(new Date().toDateString());
  const projects = _.projects;
  const {currentUser, setCurrentUser, allTaskData, setAllTaskData, allCompletedTask, setAllCompletedTask } = useContext(TaskContext);
  const [openProfilePopUp, setOpenProfilePopUp] = useState(false);

  // TODO: FETCH USER DATA FOR REAL TIME UPDATE
    useEffect(() => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const userRef = ref(db, `users/${uid}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setCurrentUser(snapshot.val());
        }
      });
      
    }, []);

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
      console.log('filter', taskArr.sort((a, b) => b.id - a.id).filter(task => task.status === 'completed'))
      setAllTaskData(taskArr.sort((a, b) => b.id - a.id).filter(task => task.status === 'pending')); //* descending pending tasks from latest to oldest added task
      setAllCompletedTask(taskArr.sort((a, b) => b.id - a.id).filter(task => task.status === 'completed')); //* descending completed tasks from latest to oldest added task
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
    {
      id: 7,
      name: "Complete",
      icon: <FaRegCircleCheck />,
      path: "/completed",
      msg: allCompletedTask.length,
    },
    {
      id: 6,
      name: "Activity Log",
      icon: <MdAutoGraph />,
      path: "/activity",
      msg: '',
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
              src={currentUser?.profile_picture || auth.currentUser?.photoURL || "https://i.pravatar.cc/300"}
            />
          </div>
          <h2 className="text-xl">{auth.currentUser?.displayName || currentUser?.username}</h2>
          <span>
            <FaAngleDown />
          </span>
        </div>
        <div className="right flex items-center gap-x-3 text-xl">
          <span className="cursor-pointer">
            <BsBell onClick={() => navigate('/activity')}/>
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
              onClick={() => {
                navigate("/profile");
                setOpenProfilePopUp(false);
              }}
              className="flex group items-center hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer "
            >
              <div className="flex items-center gap-2 ">
                <picture>
                  <img src={auth.currentUser.photoURL} className="w-10 h-10 object-fit object-center rounded-full" alt="" />
                </picture>
                <div>
                  <h2 className=" text-black text-[14px] font-semibold">
                    {auth.currentUser.displayName}
                  </h2>
                  <p className="text-fontSecondery">{auth.currentUser.email}</p>
                </div>
              </div>
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
              <BsGraphUpArrow />
              </span>
              <p className="text-fontSecondery text-[15px]">Activities</p>
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
          <div className=" mt-2 hover:bg-gray-200   px-1 p-0.5 rounded cursor-pointer text-accentMain ">
            <div onClick={handleLogOut} className="flex items-center gap-2 ">
              <span className="text-xl">
                <SlLogout />
              </span>
              <p className="text-[15px]">Log Out</p>
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
                        ? "text-pink-500"
                        : project === "Shopping"
                        ? "text-green-500"
                        : project === "Works"
                        ? "text-orange-500"
                        : project === "Errands"
                        ? "text-shadow-cyan-700"
                        : "text-blue-500"
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
