import moment from 'moment';
import React, { useContext, useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FaCalendar, FaCheck, FaComment } from 'react-icons/fa6';
import { auth } from '../../../Database/FirebaseConfig';
import TaskPage from '../../pages/TaskPage/TaskPage';
import { TaskContext } from '../../contexts/TaskContext';
import { toast } from 'react-toastify';

const ActivityCard = ({ activityData }) => {
  const { allTaskData } = useContext(TaskContext);
  const [openTaskPage, setOpenTaskPage] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const activityIcons = {
    add: <FaPlus />,
    delete: <BsFillTrash3Fill />,
    completion: <FaCheck />,
    update: <FaPen />,
    reschedule: <FaCalendar />,
    comment: <FaComment />
  }
  return (
    <>
      {
        openTaskPage && <TaskPage taskData={selectedTask} setOpenTaskPage={setOpenTaskPage} />
      }
      <div className="w-full flex py-3 cursor-pointer" onClick={() => {
        if (activityData.motherTaskId) {
          if (allTaskData.find(task => task.id === activityData.motherTaskId)) {
            setSelectedTask(allTaskData.find(task => task.id === activityData.motherTaskId));
            setOpenTaskPage(true);
          } else {
            toast.error(`This task doesn't exist anymore.`);
          }
        } else {
          if (allTaskData.find(task => task.id === activityData.taskId)) {
            setSelectedTask(allTaskData.find(task => task.id === activityData.taskId));
            setOpenTaskPage(true);
          } else {
            toast.error(`This task doesn't exist anymore.`);
          }
        }
      }}>
        <picture className="relative w-15 h-15">
          <img
            src={auth.currentUser.photoURL || "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0="}
            alt=""
            className="h-12 w-12 rounded-full object-cover object-center"
          />
        </picture>
        <div className="relative">
          <div className={`absolute bottom-3 -left-6 rounded-full flex justify-center items-center w-5 h-5 ${activityData.type === 'delete' ? 'bg-red-500' : activityData.type === 'completion' ? 'bg-green-600' : activityData.type === 'reschedule' ? 'bg-cyan-800' : 'bg-blue-500'} text-white`}>
            <span className='text-sm'>
              {activityIcons[activityData.type]}
            </span>
          </div>
        </div>
        <div className="flex flex-col ms-2">
          <p className="font-medium">
            {activityData.message} <strong>{activityData.taskTitle}</strong>
            {(activityData.taskDate || activityData.taskPriority || activityData.taskProject || activityData.comment || activityData.motherTaskTitle) && (
              <span className="conditional"> {activityData.comment ? ':' : activityData.motherTaskTitle ? 'under' : 'to'} <span className="font-bold">{new Date(new Date().setDate(new Date().getDate() + 1)).toDateString().includes(activityData.taskDate) ? 'Tomorrow' : new Date().toDateString().includes(activityData.taskDate) ? 'Today' : activityData.taskDate || activityData.taskPriority || activityData.taskProject || activityData.motherTaskTitle || `"${activityData.comment}"`}</span></span>
            )}
          </p>
          <p className="text-sm text-fontSecondery">
            {moment(activityData?.createdAt).fromNow() || '02:33 pm'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;