import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TaskContext } from '../../contexts/TaskContext';
import TaskCard from '../../components/common/TaskCard';
import AddTaskPrompt from '../../components/common/AddTaskPrompt';

const ProjectPage = () => {
  // * (HELPER) TO EXTRACT PARAM FROM PATH ===
  const getParam = () => {
    const pathArr = path.split('/');
    return pathArr[pathArr.length - 1];
  }
  const location = useLocation();
  const path = location.pathname;
  const projectName = getParam();
  const {allTaskData} = useContext(TaskContext);
  const [projectTaskData, setProjectTaskData] = useState([]);

  
  // TODO: FETCH ALL PROJECT TASK DATA ON PROJECT TAB/PAGE CHANGE ===================================
  useEffect(() => {
    setProjectTaskData(allTaskData.filter(task => task.project === projectName));  
  }, [projectName])

  return (
    <>
      <div className="heading w-6/10 mx-auto pb-5">
        <h1 className='text-3xl font-bold'>{projectName}</h1>
        <AddTaskPrompt />
      </div>
      <div className='h-full w-full overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
        <div className="pendingTaskContainer w-6/10 mx-auto ">

          <div className="taskList flex flex-col gap-y-3 my-3 ">
          {
              projectTaskData?.map((task, idx, arr) => (
                <div key={task.id} className={idx < arr.length - 1 ? 'border-b border-[rgba(0,0,0,0.19)]' : ''}>
                  <TaskCard taskData={task}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectPage