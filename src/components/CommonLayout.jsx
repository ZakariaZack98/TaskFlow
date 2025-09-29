import React, { useEffect, useState } from "react";
import Sidebar from "./common/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { auth } from "../../Database/FirebaseConfig";
import { TaskContext, TaskProvider } from "../contexts/TaskContext";
import { onAuthStateChanged } from "firebase/auth";
import UserNotVerified from "./common/UserNotVerified";
import SignIn from "../pages/SignIn/SignIn";

const CommonLayout = () => {
  const location = useLocation();
  const path = location.pathname;
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
        <div className="flex h-screen w-full commonlayout overflow-hidden">
          <Sidebar />
          <div className="flex flex-col w-4/5 p-5 bg-[rgba(255,255,255,0.77)] pt-10">
            <Outlet />
          </div>
        </div>
      </TaskProvider>
    );
  } else {
    content = <SignIn />;
  }

  return <>{content}</>;
};

export default CommonLayout;
