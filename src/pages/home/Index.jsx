import React, { useContext, useState, useEffect } from 'react'
import _ from '../../lib/lib'
import AddTaskPrompt from '../../components/common/AddTaskPrompt';
import { TaskContext } from '../../contexts/TaskContext';
import { GetMilliseconds } from '../../utils/utils';
import TasklistSection from '../../components/common/TasklistSection';
import Boardview from '../../components/HomeComponent/Boardview';

const Inbox = () => {
  const { allTaskData } = useContext(TaskContext);

  const [todaysTaskData, setTodaysTaskData] = useState([]);
  const [overdueData, setOverdueTaskData] = useState([]);
  const [getUpcomingTaskData, setUpcomingTaskData] = useState([]);
  const [boardview, setBoardview] = useState(false)

  useEffect(() => {
    if (!allTaskData) return;

    const todayMs = GetMilliseconds(new Date().toDateString());

    setTodaysTaskData(allTaskData.filter(task => task?.deadline === todayMs));
    setOverdueTaskData(allTaskData.filter(task => task?.deadline < todayMs));
    setUpcomingTaskData(allTaskData.filter(task => task?.deadline > todayMs));
  }, [allTaskData]);

  return (
    <>
      <div className={boardview?"heading w-6/10 mx-auto pb-5":"heading w-[90%] mx-auto pb-5"}>
        <h1 className='text-3xl font-bold'>Inbox</h1>
        <AddTaskPrompt />
      </div>
      {boardview?
      <div className='h-full w-full overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
        <div className="pendingTaskContainer w-6/10 mx-auto ">

          <div className="taskList flex flex-col gap-y-3 my-3 ">
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
      :
      <Boardview  taskData = {[overdueData,todaysTaskData,getUpcomingTaskData]}/>
      }
    </>
  );
};

export default Inbox;
