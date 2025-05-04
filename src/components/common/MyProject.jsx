import React from "react";
import { CiHashtag } from "react-icons/ci";
import _ from "../../lib/lib";

const MyProject = () => {
  const projects = _.projects;
  return (
    <div>
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
    </div>
  );
};

export default MyProject;
