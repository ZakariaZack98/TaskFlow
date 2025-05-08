import React, { useContext } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import TaskCard from '../../components/common/TaskCard';
import NoTaskToDisplay from '../../components/common/NoTaskToDisplay';

const Completed = () => {
  const {allCompletedTask} = useContext(TaskContext);
  return (
    <>
      <div className="heading w-6/10 mx-auto pb-5">
        <h1 className='text-3xl font-bold'>Complete</h1>
      </div>
      <div className='h-full w-full overflow-y-scroll' style={{ scrollbarWidth: 'none' }}>
        <div className="pendingTaskContainer w-6/10 mx-auto h-full">
          {
            allCompletedTask && allCompletedTask.length > 0 ? (
              <div className="taskList flex flex-col gap-y-3 my-3 ">
                {
                  allCompletedTask?.map((task, idx, arr) => (
                    <div key={task.id} className={idx < arr.length - 1 ? 'border-b border-[rgba(0,0,0,0.19)]' : ''}>
                      <TaskCard taskData={task} complete={true}/>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className='h-full w-full flex justify-center items-center'>
                <NoTaskToDisplay />
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Completed