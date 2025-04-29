import React, { useState } from 'react'
import { FaAngleDown, FaFlag } from 'react-icons/fa6'
import _ from '../../lib/lib'

const PrioritySelector = ({ priority, setPriority }) => {
  const priorities = _.priorities;
  const [openPriority, setOpenPriority] = useState(false);
  return (
    <>
      <div className="active flex justify-between items-center py-2 px-4 rounded-md bg-focusMain cursor-pointer my-5 " onClick={() => setOpenPriority(prev => !prev)}>
        <div className="flex gap-x-1 text-sm">
          <span className="text-xl" style={{ color: priority.color }}>
            <FaFlag />
          </span>
          <span>Priority {priority.level}</span>
        </div>
        <span>
          <FaAngleDown />
        </span>
      </div>
      {
        openPriority && (
          <div className="relative left-0 top-0 rounded-md p-2 bg-white z-10" style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)' }}>
            {
              priorities.map(priority => (
                <div key={priority.level} className="active flex justify-between items-center py-2 px-4 my-2 rounded-md  cursor-pointer hover:bg-[#e6e6e6]" onClick={() => {
                  setPriority(priority);
                  setOpenPriority(false)
                }}>
                  <div className="flex gap-x-2 text-sm">
                    <span className={`text-xl`} style={{ color: priority.color }}>
                      <FaFlag />
                    </span>
                    <span>Priority {priority.level}</span>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </>

  )
}

export default PrioritySelector