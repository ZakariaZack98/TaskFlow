import React, { useState } from 'react'
import CalendarPopup from './CalenderPopup';
import { CiCalendarDate } from 'react-icons/ci';

const DateSelector = ({date, setDate}) => {
  const [openDate, setOpenDate] = useState(false);
  return (
    <>
      <div className="flex gap-x-2 items-center py-4 border-b border-[rgba(0,0,0,0.19)]" onClick={() => setOpenDate(prev => !prev)}>
        <span>
          <CiCalendarDate />
        </span>
        <span className="text-sm text-secondary">{date.toDateString() === new Date().toDateString() ? 'Today' : date.toDateString()}</span>
      </div>
      {
        openDate && (
          <div className="absolute top-18 left-0 w-full">
            <CalendarPopup onSelect={(date) => {
              setDate(date);
              setOpenDate(false);
              }} />
          </div>
        )
      }
    </>
  )
}

export default DateSelector