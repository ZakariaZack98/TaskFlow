import React, { useContext, useState, useEffect } from 'react'
import _ from '../../lib/lib'
import AddTaskPrompt from '../../components/common/AddTaskPrompt';
import { TaskContext } from '../../contexts/TaskContext';
import { GetMilliseconds } from '../../utils/utils';
import TasklistSection from '../../components/common/TasklistSection';

const Inbox = () => {
  const { allTaskData } = useContext(TaskContext);

  const [todaysTaskData, setTodaysTaskData] = useState([]);
  const [overdueData, setOverdueTaskData] = useState([]);
  const [getUpcomingTaskData, setUpcomingTaskData] = useState([]);

  useEffect(() => {
    if (!allTaskData) return;

    const todayMs = GetMilliseconds(new Date().toDateString());

    setTodaysTaskData(allTaskData.filter(task => task?.deadline === todayMs));
    setOverdueTaskData(allTaskData.filter(task => task?.deadline < todayMs));
    setUpcomingTaskData(allTaskData.filter(task => task?.deadline > todayMs));
  }, [allTaskData]);

  return (
    <div className='h-full w-full py-10 overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
      <div className="pendingTaskContainer w-6/10 mx-auto ">
        <h1 className='text-3xl font-bold'>Inbox</h1>
        <AddTaskPrompt />
        <div className="taskList flex flex-col gap-y-3 my-3 mt-10">
          {
            overdueData?.length > 0 && (
              <TasklistSection title={'Overdue'} titleColorClass={'text-accentMain'} taskData={overdueData} />
            )
          }
          {
            todaysTaskData?.length > 0 && (
              <TasklistSection title={'Today'} taskData={todaysTaskData} />
            )
          }
          {
            getUpcomingTaskData?.length > 0 && (
              <TasklistSection title={'Upcoming'} taskData={getUpcomingTaskData} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Inbox;
