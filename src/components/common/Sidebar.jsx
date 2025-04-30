import React, { useContext, useEffect } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BiCheckboxChecked } from "react-icons/bi";
import { BsBell } from "react-icons/bs";
import { CiHashtag, CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { GoInbox } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { MdOutlineCalendarToday } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import { onValue, ref } from "firebase/database";
import { db } from "../../../Database/FirebaseConfig";

const Sidebar = ({
  userName = "Mahmudd",
  imgUrl = "https://images.pexels.com/photos/31630076/pexels-photo-31630076/free-photo-of-historic-street-scene-in-lisbon-with-cobblestones.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  category = [],
}) => {

  const {allTaskData, setAllTaskData} = useContext(TaskContext);
  /**
   * TODO: FETCH ALL TASKS DATA FROM THE DATABASE AFTER USER AUTHENTICATION ==============
   * @param {userId} string containing user id
   * @returns {Array} containing all tasks data
   * */
  useEffect(() => {
    const taskRef = ref(db, `tasks/`);
    const unsubscribe = onValue(taskRef, (snapshot) => {
      const taskArr = [];
      if(snapshot.exists()) {
        snapshot.forEach(taskSnapshot => {
          taskArr.push(taskSnapshot.val());
        })
      }
      setAllTaskData(taskArr.sort((a, b) => b.id - a.id)) //* ascending from latest to oldest
    })
    return () => unsubscribe();
  }, [db])

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
  const favouriteList = [
    {
      id: 1,
      icon: <CiHashtag />,
      name: "Daily Task",
      path: "/dailyTask",
      msg: 4,
    },
  ];
  const myProject = [
    {
      id: 1,
      icon: <CiHashtag />,
      name: "Home",
      path: "/home",
      msg: 1,
    },
    {
      id: 2,
      icon: <CiHashtag />,
      name: "Daily Tak",
      path: "/dailyTask",
      msg: 2,
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
      <div className="flex items-center gap-x-1 mt-4">
        <span className="text-red-500 text-3xl">
          <IoMdAddCircle />
        </span>
        <h2>Add task</h2>
      </div>
      {/* add task part end */}
      {/* nav list part start */}
      <div className="flex flex-col gap-y-4 mt-4">
        {navList?.map((item, index) => (
          <div
            onClick={() => navigate(item?.path)}
            key={item?.id}
            className={`flex group items-center justify-between ${
              path === item?.path ? "bg-focusMain" : ""
            }`}
          >
            <div className="flex items-center gap-x-3  ">
              <span className="group-hover:text-red-500 transition-all text-2xl">
                {item?.icon}
              </span>
              <h2 className="group-hover:text-red-500">{item?.name}</h2>
            </div>
            <p className="text-[12px] group-hover:text-red-500">{item?.msg}</p>
          </div>
        ))}
      </div>
      {/* nav list part end */}
      {/* favourite part start */}
      <div className="mt-4">
        <h1 className="text-xl ">Favourite</h1>
        <div>
          {favouriteList?.map((item, index) => (
            <div key={item.name}
              onClick={() => navigate(item?.path)}
              className="flex items-center justify-between"
            >
              <div key={item?.id} className="flex items-center gap-x-3 mt-2 ">
                <span className="hover:text-red-500 transition-all text-xl">
                  {item?.icon}
                </span>
                <h2 className="hover:text-red-500">{item?.name}</h2>
              </div>
              <p className="text-[12px]">{item?.msg}</p>
            </div>
          ))}
        </div>
      </div>
      {/* favourite part end */}
      {/* my project part start */}
      <div className="mt-4">
        <h1 className="text-xl ">My Project</h1>
        <div>
          {myProject?.map((item, index) => (
            <div
              onClick={() => navigate(item?.path)}
              className="flex items-center justify-between"
            >
              <div key={item?.id} className="flex items-center gap-x-3 mt-2 ">
                <span className="hover:text-red-500 transition-all text-xl">
                  {item?.icon}
                </span>
                <h2 className="hover:text-red-500">{item?.name}</h2>
              </div>
              <p className="text-[12px]">{item?.msg}</p>
            </div>
          ))}
        </div>
      </div>
      {/* my project part end */}
      {/* add taeam part start */}
      <div className="flex items-center gap-x-1 mt-20">
        <span className="text-gray-800 text-3xl">
          <IoMdAddCircle />
        </span>
        <h2>Add a team</h2>
      </div>

      {/* add taeam part end */}
    </div>
  );
};

export default Sidebar;
