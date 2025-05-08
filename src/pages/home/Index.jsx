import React, { useContext, useState, useEffect } from 'react'
import _ from '../../lib/lib'
import AddTaskPrompt from '../../components/common/AddTaskPrompt';
import { TaskContext } from '../../contexts/TaskContext';
import { GetMilliseconds } from '../../utils/utils';
import TasklistSection from '../../components/common/TasklistSection';
import Boardview from '../../components/HomeComponent/Boardview';
import { LiaSlidersHSolid } from 'react-icons/lia';
import { RiKeyboardBoxLine } from 'react-icons/ri';
import { MdFormatListBulleted } from 'react-icons/md';

const Inbox = () => {
  const { allTaskData, boardView, setBoardView } = useContext(TaskContext);

  const [todaysTaskData, setTodaysTaskData] = useState([]);
  const [overdueData, setOverdueTaskData] = useState([]);
  const [getUpcomingTaskData, setUpcomingTaskData] = useState([]);
  const [openViewSelector, setOpenViewSelector] = useState(false);
  const [boardviewdata, setBoardviewdata] = useState([])

  useEffect(() => {
    if (!allTaskData) return;

    const todayMs = GetMilliseconds(new Date().toDateString());

    setTodaysTaskData(allTaskData.filter(task => task?.deadline === todayMs));
    setOverdueTaskData(allTaskData.filter(task => task?.deadline < todayMs));
    setUpcomingTaskData(allTaskData.filter(task => task?.deadline > todayMs));
  }, [allTaskData]);

  // Three types data are store in boardviewdata
  useEffect(() => {
    setBoardviewdata(
      [{
        name: "Overdue",
        data: overdueData
      },
      {
        name: "Today",
        data: todaysTaskData
      },
      {
        name: "Upcoming",
        data: getUpcomingTaskData
      }])
  }, [overdueData, todaysTaskData, getUpcomingTaskData])


  return (
    <>
      <div className="absolute right-20 top-10 flex items-center gap-x-1 px-4 py-1.5 rounded cursor-pointer hover:bg-focusMain duration-300">
        <div className='flex gap-x-2 items-center' onClick={() => setOpenViewSelector(prev => !prev)}>
          <span>
            <LiaSlidersHSolid />
          </span>
          <p>View</p>
        </div>
        {
          openViewSelector && (
            <div className="absolute -left-24 top-10 flex gap-x-2 p-2 bg-white rounded-md border border-[rgba(0,0,0,0.25)] text-fontSecondery" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.1)' }}>
              <div className="flex flex-col justify-center items-center gap-y-1" onClick={() => {
                setBoardView(true);
                setOpenViewSelector(false);
                }}>
                <div className={`flex justify-center items-center w-20 h-15 rounded-md bg-[rgba(0,0,0,0.08)] text-3xl ${boardView ? 'bg-[rgba(0,0,0,0.2)] border-2 border-accentMain' : 'bg-[rgba(0,0,0,0.08)]'}`}>
                  <RiKeyboardBoxLine />
                </div>
                <p className={`text-sm ${boardView ? 'font-semibold text-accentMain' : ''}`}>Board</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-y-1" onClick={() => {
                setBoardView(false);
                setOpenViewSelector(false)
                }}>
                <div className={`flex justify-center items-center w-20 h-15 rounded-md text-3xl ${!boardView ? 'bg-[rgba(0,0,0,0.2)] border-2 border-accentMain' : 'bg-[rgba(0,0,0,0.08)]'}`}>
                  <MdFormatListBulleted />
                </div>
                <p className={`text-sm ${!boardView ? 'font-semibold text-accentMain' : ''}`}>List</p>
              </div>

            </div>
          )
        }
      </div>
      <div className={!boardView ? "heading w-6/10 mx-auto pb-5 flex justify-between items-start" : "heading w-[90%] mx-auto pb-5 flex justify-between items-center"}>
        <div className="left">
          <h1 className='text-3xl font-bold'>Inbox</h1>
          <AddTaskPrompt />
        </div>
      </div>
      {!boardView ?
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
        <Boardview taskData={boardviewdata} />
      }
    </>
  );
};

export default Inbox;
