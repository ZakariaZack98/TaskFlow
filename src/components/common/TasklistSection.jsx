import React from 'react'
import TaskCard from './TaskCard'

const TasklistSection = ({title, taskData, titleColorClass = 'text-black'}) => {
  console.log(taskData)
  return (
    <div>
      <h1 className={`text-3xl font-semibold border-b-2 border-[rgba(0,0,0,0.27)] py-1 ${titleColorClass}`}>{title}</h1>
      <div className="flex flex-col my-2">
        {
          taskData?.map((task, idx, arr) => {
            return <div className={idx < arr.length - 1 ? 'border-b border-[rgba(0,0,0,0.15)]' : ''}>
              <TaskCard key={task.id} taskData={task}/>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default TasklistSection