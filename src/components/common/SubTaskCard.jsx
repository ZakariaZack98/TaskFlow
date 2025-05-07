import React from 'react'
import RoundedCheckbox from './RoundedCheckbox'
import { GoPencil } from 'react-icons/go'
import { BsFillTrash3Fill } from 'react-icons/bs'

const SubTaskCard = ({ subTaskData, motherTaskId }) => {
  return (
    <div className='flex justify-between items-center pb-2'>
      <div className="left flex items-center">
        <RoundedCheckbox />
        <p>{subTaskData.title}</p>
      </div>
      <div className="right flex gap-x-2 text-xl">
        <span>
          <GoPencil/>
        </span>
        <span className='text-red-600'>
          <BsFillTrash3Fill/>
        </span>
      </div>
    </div>
  )
}

export default SubTaskCard