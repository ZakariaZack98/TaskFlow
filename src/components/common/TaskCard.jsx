import React, { useState } from 'react'
import { PiDotsSixVerticalBold, PiDotsThreeOutline } from 'react-icons/pi'
import RoundedCheckbox from './RoundedCheckbox'
import _ from '../../lib/lib'
import { SlCalender } from 'react-icons/sl'
import { GoPencil } from 'react-icons/go'
import { MdOutlineDateRange } from 'react-icons/md'
import { FaRegMessage } from 'react-icons/fa6'
import { GetDateNow, GetMilliseconds } from '../../utils/utils'
import CalendarPopup from './CalenderPopup'
import TaskPage from '../../pages/TaskPage/TaskPage'
import { ref, set } from 'firebase/database'
import { auth, db } from '../../../Database/FirebaseConfig'
import EditTaskPrompt from './EditTaskPrompt'

const TaskCard = ({ taskData }) => {
  const [hover, setHover] = useState(false);
  const [recheduleMode, setRecheduleMode] = useState(false);
  const [date, setDate] = useState(taskData.date);
  const [openTaskPage, setOpenTaskpage] = useState(false);
  const [openEditPrompt, setOpenEditPrompt] = useState(false);

  const handleRechedule = async (taskId, selectedDate) => {
    const dateRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskId}/date`);
    const deadlineRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskId}/deadline`)
    try {
      await Promise.all([set(dateRef, selectedDate), set(deadlineRef, GetMilliseconds(selectedDate + ` ${new Date().toDateString().split(' ')[3]}`))])
      console.log('rescheduling successful')
    } catch (error) {
      console.error('Task recheduling failed ', error)
    }
  }

  return (
    <>
      {
        openTaskPage && <TaskPage taskData={taskData} setOpenTaskPage={setOpenTaskpage} />
      }
      {
        openEditPrompt && <EditTaskPrompt taskData={taskData} setOpenEditPrompt={setOpenEditPrompt} />
      }
      <div className='flex justify-between items-start cursor-pointer pb-3' onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} >
        <div className="left flex items-start" >
          <div className="flex  gap-x-1 ">
            <div className="flex items-start translate-y-1">
              <span className={`text-xl ${hover ? 'visible' : 'invisible'}`}>
                <PiDotsSixVerticalBold />
              </span>
              <RoundedCheckbox />
            </div>
            <div className="flex flex-col" onClick={() => setOpenTaskpage(true)}>
              <p>{taskData.title}</p>
              <div className="flex justify-start items-center text-sm gap-x-2">
                <span>
                  <SlCalender />
                </span>
                <p className='text-fontSecondery'>{GetDateNow() === taskData.date ? 'Today' : Number(taskData.date.split(' ')[2]) - Number(GetDateNow().split(' ')[2]) === 1 ? 'Tomorrow' : taskData.date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right flex flex-col justify-center items-center">
          <div className={`relative icons flex items-center gap-x-3 text-xl text-fontSecondery ${hover ? 'visible' : 'invisible'}`}>
            <span className='text-2xl hover:text-accentMain' onClick={() => setOpenEditPrompt(prev => !prev)}>
              <GoPencil />
            </span>
            <span className='text-2xl hover:text-accentMain relative' onClick={() => setRecheduleMode(!recheduleMode)}>
              <MdOutlineDateRange />
              <span className={`absolute top-10` + (recheduleMode ? ' visible' : ' invisible')}>
                <CalendarPopup deadline={taskData?.deadline} onSelect={selectedDate => {
                  const selectedDateStr = selectedDate.toDateString().split(' ').slice(0, 3).join(' ')
                  setDate(selectedDateStr);
                  handleRechedule(taskData.id, selectedDateStr)
                }} />
              </span>
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
    </>
  )
}

export default TaskCard