import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "./components/CommonLayout";
import Inbox from "./pages/home/Index";
import Today from "./pages/Today/Today";
import Upcoming from "./pages/Upcoming/Upcoming";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import UserNotVerified from "./components/common/UserNotVerified";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import Activity from "./pages/Activity/Activity";
import FiltersANDlabels from "./pages/FiltersANDlabels/FiltersANDlabels";
import Completed from "./pages/Completed/Completed";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Inbox />} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/filters&labels" element={<FiltersANDlabels />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects/:name" element={<ProjectPage/>}/>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
