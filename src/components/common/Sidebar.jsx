import React, { useContext, useEffect } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiCheckboxChecked } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { CiHashtag, CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { MdOutlineCalendarToday } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../../../Database/FirebaseConfig";
import _ from "../../lib/lib";
import AddTaskPrompt from "../common/AddTaskPrompt";

const Sidebar = ({
  userName = auth.currentUser?.displayName || "N/A",
  imgUrl = auth?.currentUser?.photoURL || "https://images.pexels.com/photos/31630076/pexels-photo-31630076/free-photo-of-historic-street-scene-in-lisbon-with-cobblestones.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  category = [],
}) => {

  const projects = _.projects;
  const { allTaskData, setAllTaskData } = useContext(TaskContext);


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
      setAllTaskData(taskArr.sort((a, b) => b.id - a.id)); //* descending from latest to oldest added task
    });
    return () => unsubscribe();
  }, [db]);

  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const navList = [
    {
      id: 1,
      name: "Search",
      icon: <CiSearch />,
      path: "/search",
      msg: 9,
    },
    {
      id: 2,
      name: "Inbox",
      icon: <GoInbox />,
      path: "/",
      msg: 9,
    },
    {
      id: 3,
      name: "Today",
      icon: <MdOutlineCalendarToday />,
      path: "/today",
      msg: 9,
    },
    {
      id: 4,
      name: "Upcoming",
      icon: <SlCalender />,
      path: "/upcoming",
      msg: 9,
    },
    {
      id: 5,
      name: "Filters & Labels",
      icon: <AiOutlineAppstoreAdd />,
      path: "/filters&labels",
      msg: 9,
    },
    {
      id: 6,
      name: "Completed",
      icon: <BiCheckboxChecked />,
      path: "/completed",
      msg: 9,
    },
  ];
  return (
    <div className="w-1/5 h-full bg-sidebarMain p-5">
      {/* profile part start */}
      <div className="flex justify-between">
        <div className="left flex items-center gap-x-1.5">
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
              onClick={() => navigate(project)}
              className="flex items-center group justify-between  hover:bg-gray-200  -ml-3 px-4 py-0.5 rounded-md cursor-pointer"
            >
              <div key={project} className="flex items-center gap-x-3 mt-1 ">
                <span className={` text-fontSecondery transition-all text-xl ${project === 'Personal' ? 'text-blue-500' : project === 'Shopping' ? 'text-green-500' : project === 'Works' ? 'text-orange-500' : project === 'Errands' ? 'text-shadow-cyan-700' : 'text-gray-800'}`}>
                  <CiHashtag />
                </span>
                <h2 className="group-hover:text-accentMain text-fontSecondery">
                  {project}
                </h2>
              </div>
              <p className="text-[12px] group-hover:text-accentMain text-gray-400">
                5
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* my project part end */}
    </div>
  );
};

export default Sidebar;
