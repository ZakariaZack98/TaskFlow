import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import { GetMilliseconds } from '../../utils/utils';
import TaskCard from '../../components/common/TaskCard';
import AddTaskPrompt from '../../components/common/AddTaskPrompt';

const Today = () => {
  const {allTaskData} = useContext(TaskContext);
  const [todaysTaskData, setTodaysTaskData] = useState([])

  useEffect(() => {
    setTodaysTaskData(allTaskData.filter(task => task.deadline === GetMilliseconds(new Date().toDateString())))
  }, [allTaskData])

  return (
    <div className='outletPage h-full w-full py-10 overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
      <div className="pendingTaskContainer w-6/10 mx-auto ">
        <h1 className='text-3xl font-bold'>Today</h1>
        <AddTaskPrompt />
        {
          todaysTaskData && todaysTaskData.length > 0 && (
            <div className='flex flex-col mt-4'>
              {
                todaysTaskData.map(task => <TaskCard key={task.id} taskData={task}/>)
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Today
