import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import { GetMilliseconds } from '../../utils/utils';
import TaskCard from '../../components/common/TaskCard';
import AddTaskPrompt from '../../components/common/AddTaskPrompt';

const Today = () => {
  const { allTaskData } = useContext(TaskContext);
  const [todaysTaskData, setTodaysTaskData] = useState([])

  useEffect(() => {
    setTodaysTaskData(allTaskData.filter(task => task.deadline === GetMilliseconds(new Date().toDateString())))
  }, [allTaskData])

  return (
    <>
      <div className="heading w-6/10 mx-auto pb-5">
        <h1 className='text-3xl font-bold'>Today</h1>
        <AddTaskPrompt />
      </div>
      <div className='h-full w-full overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
        <div className="pendingTaskContainer w-6/10 mx-auto ">

          <div className="taskList flex flex-col gap-y-3 my-3 ">
            {
              todaysTaskData?.map((task, idx, arr) => (
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

export default Today
