import React, { useState } from 'react'
import { PiDotsSixVerticalBold, PiDotsThreeOutline } from 'react-icons/pi'
import RoundedCheckbox from './RoundedCheckbox'
import _ from '../../lib/lib'
import { SlCalender } from 'react-icons/sl'
import { GoPencil } from 'react-icons/go'
import { MdOutlineDateRange } from 'react-icons/md'
import { FaRegMessage } from 'react-icons/fa6'

const TaskCard = ({ taskData = _.dummyTaskArr[0] }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className='flex justify-between items-start cursor-pointer pb-3' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="left flex items-start">
        <div className="flex  gap-x-1 ">
          <div className="flex items-start translate-y-1">
            <span className={`text-xl ${hover ? 'visible' : 'invisible'}`}>
              <PiDotsSixVerticalBold />
            </span>
            <RoundedCheckbox />
          </div>
          <div className="flex flex-col">
            <p>{taskData.title}</p>
            <div className="flex justify-start items-center text-sm gap-x-2">
              <span>
                <SlCalender />
              </span>
              <p className='text-fontSecondery'>{taskData.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right flex flex-col justify-center items-center">
        <div className={`icons flex items-center gap-x-3 text-xl text-fontSecondery ${hover ? 'visible' : 'invisible'}`}>
          <span className='text-2xl hover:text-accentMain'>
            <GoPencil />
          </span>
          <span className='text-2xl hover:text-accentMain'>
            <MdOutlineDateRange />
          </span>
          <span className=' hover:text-accentMain'>
            <FaRegMessage />
          </span>
          <span className=' hover:text-accentMain'>
            <PiDotsThreeOutline />
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard