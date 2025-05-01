import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import { Outlet } from "react-router-dom";
import { auth } from "../../Database/FirebaseConfig";
import { LiaSlidersHSolid } from "react-icons/lia";

import { onValue, ref } from "firebase/database";
import { db } from "../../Database/FirebaseConfig";
import { TaskContext, TaskProvider } from "../contexts/TaskContext";
import { onAuthStateChanged } from "firebase/auth";
import UserNotVerified from "./common/UserNotVerified";

const CommonLayout = () => {
  const [userVerified, setuserVerifed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setuserVerifed(user.emailVerified);
    });
  }, []);

  let content = null;

  if (userVerified) {
    content = (
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
  } else {
    content = <UserNotVerified />;
  }

  return <>{content}</>;
};

export default CommonLayout;
