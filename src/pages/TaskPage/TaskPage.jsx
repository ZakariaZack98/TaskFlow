import React from 'react'

const TaskPage = ({taskData}) => {
  return (
    <div className='absolute top-0 left-0 w-svw h-svh '>
      <div className="backdrop absolute w-svw h-svh bg-[rgba(0,0,0,0.47)]"></div>
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="w-6/10 h-9/10 flex justify-center items-center rounded-xl bg-white " style={{boxShadow: '0 0 10 10 rgba(0, 0, 0, 0.97)'}}>
          <div className="w-[96%] h-[94%] overflow-y-scroll">
            <p>task pop-up</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskPage
