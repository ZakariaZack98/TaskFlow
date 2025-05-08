import React, { useState } from 'react'
import CalendarPopup from './CalenderPopup';
import { CiCalendarDate } from 'react-icons/ci';

const DateSelector = ({date = new Date().toDateString() , setDate, border, deadline}) => {
  const [openDate, setOpenDate] = useState(false);
  return (
    <div className='relative'>
      <div className={`flex gap-x-2 items-center py-4 cursor-pointer  ${border ? 'border-b border-[rgba(0,0,0,0.19)] ' : ''}`} onClick={() => setOpenDate(prev => !prev)}>
        <span>
          <CiCalendarDate />
        </span>
        <span className="text-sm text-secondary">{date === new Date().toDateString() ? 'Today' : date}</span>
      </div>
      {
        openDate && (
          <div className="absolute top-18 left-0 w-full z-50">
            <CalendarPopup deadline={deadline} onSelect={(date) => {
              console.log(date)
              setDate(date.toDateString().split(' ').slice(0, 3).join(' ')); //Making format like (Sunday 15 Apr)
              setOpenDate(false);
              
              }} />
          </div>
        )
      }
    </div>
  )
}

export default DateSelector