import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import TasklistSection from '../../components/common/TasklistSection';
import AddTaskPrompt from '../../components/common/AddTaskPrompt';
import { GetMilliseconds } from '../../utils/utils';
import NoTaskToDisplay from '../../components/common/NoTaskToDisplay';

const Upcoming = () => {
  const { allTaskData } = useContext(TaskContext);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [datesWithWorks, setDateWithWorks] = useState([]);

  useEffect(() => {
    setUpcomingTasks(allTaskData.filter(task => task?.deadline > GetMilliseconds(new Date().toDateString())));
  }, [allTaskData])

  useEffect(() => {
    setDateWithWorks(Array.from(new Set([...upcomingTasks?.map(task => task?.date)])));
  }, [upcomingTasks])

  return (
    <>
      <div className="heading w-6/10 mx-auto pb-5">
        <h1 className='text-3xl font-bold'>Upcoming</h1>
        <AddTaskPrompt />
      </div>
      <div className='h-full w-full overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
        {
          datesWithWorks && datesWithWorks.length > 0 ? (
            <div className="pendingTaskContainer w-6/10 mx-auto ">

              <div className="taskList flex flex-col gap-y-3 my-3 ">
                {
                  datesWithWorks?.map(date => <TasklistSection key={date} title={date} taskData={upcomingTasks?.filter(task => task.date === date)} />)
                }
              </div>
            </div>
          ) : (
            <div className='h-full w-full flex justify-center items-center'>
              <NoTaskToDisplay />
            </div>
          )
        }
      </div>
    </>
  )
}

export default Upcoming
