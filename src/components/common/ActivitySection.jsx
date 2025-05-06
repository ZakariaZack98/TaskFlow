import React from 'react'
import ActivityCard from './ActivityCard'

const ActivitySection = ({date, activityDataArr}) => {
  return (
    <div className='w-full'>
      <h3 className="text-xl font-semibold py-2 border-b border-[#0000005b] w-full">{ new Date().toDateString() === date ? 'Today' : date }</h3>
      <div className="flex flex-col gap-y-2 w-full">
        {
          activityDataArr?.map((activity, idx, arr) => (
            <div key={activity.timeStamp} className={idx < arr.length - 1 ? 'border-b border-[rgba(0,0,0,0.23)]' : ''}>
              <ActivityCard activityData={activity}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ActivitySection