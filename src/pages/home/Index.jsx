import React, { useContext } from 'react'
import TaskCard from '../../components/common/TaskCard'
import _ from '../../lib/lib'
import AddTaskPrompt from '../../components/common/AddTaskPrompt';
import { TaskContext } from '../../contexts/TaskContext';

const Inbox = () => {
  const {allTaskData, setAllTaskData} = useContext(TaskContext);
  // const taskDataArr = _.dummyTaskArr.filter(task => task.status === 'Pending');
  return (
    <div className='h-full w-full'>
      <div className="pendingTaskContainer w-5/10 mx-auto ">
        <h1 className='text-3xl font-bold'>Inbox</h1>
        <div className="taskList flex flex-col gap-y-3 my-3">
          {
            allTaskData.length > 0 ? allTaskData.map((task, index) => (
              <div className={index < allTaskData.length -1 ? 'border-b border-[rgba(0,0,0,0.22)]' : ''}>
                <TaskCard key={index} taskData={task} />
              </div>
            )) : (
              <div className="text-center text-xl font-semibold">No tasks available</div>
            )
          }
        </div>
        <AddTaskPrompt/>
      </div>
    </div>
  )
}

export default Inbox
