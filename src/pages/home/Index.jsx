import React from 'react'
import TaskCard from '../../components/common/TaskCard'
import _ from '../../lib/lib'
import { FaPlusCircle } from 'react-icons/fa';

const Inbox = () => {
  const taskDataArr = _.dummyTaskArr.filter(task => task.status === 'Pending');
  console.log(taskDataArr);
  return (
    <div className='h-full w-full'>
      <div className="pendingTaskContainer w-5/10 mx-auto ">
        <h1 className='text-3xl font-bold'>Inbox</h1>
        <div className="taskList flex flex-col gap-y-3 my-3">
          {
            taskDataArr.length > 0 ? taskDataArr.map((task, index) => (
              <div className={index < taskDataArr.length -1 ? 'border-b border-[rgba(0,0,0,0.22)]' : ''}>
                <TaskCard key={task.id} taskData={task} />
              </div>
            )) : (
              <div className="text-center text-xl font-semibold">No tasks available</div>
            )
          }
        </div>
        <div className="flex items-center gap-x-2 cursor-pointer mt-10">
          <span className='text-accentMain text-2xl'>
            <FaPlusCircle/>
          </span>
          <p className='text-accentMain'>Add Task</p>
        </div>
      </div>
    </div>
  )
}

export default Inbox
