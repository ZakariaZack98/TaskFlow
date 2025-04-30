import React, { useContext, useEffect } from "react";
import Sidebar from "./common/Sidebar";
import { Outlet } from "react-router-dom";
import { LiaSlidersHSolid } from "react-icons/lia";
import { onValue, ref } from "firebase/database";
import { db } from "../../Database/FirebaseConfig";
import { TaskContext, TaskProvider } from "../contexts/TaskContext";

const CommonLayout = () => {
  return (
    <TaskProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex flex-col w-4/5 p-5">
          <div className="w-full flex justify-end ">
            <div className="flex items-center gap-x-1 px-4 py-1.5 rounded cursor-pointer hover:bg-focusMain duration-300">
              <span>
                <LiaSlidersHSolid />
              </span>
              <p>View</p>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </TaskProvider>
  );
};

export default CommonLayout;
