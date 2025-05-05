import React from 'react'
import TasklistSection from '../common/TasklistSection';
import { GetMilliseconds } from '../../utils/utils';
const Boardview = ({ taskData }) => {
    console.log(taskData);
    // const todayMs = GetMilliseconds(new Date().toDateString());
    return (
        <div className='bg-red-70 flex flex-col items-center gap-2'>
            <div className='flex justify-around w-[90%] gap-2'>
                {taskData.map((singleItem, index) => (
                    <div className=' border-none w-1/3 '>
                        <TasklistSection title={index == 0 ? "Overdue" : index == 1 ? "Today" : "Upcoming"} titleColorClass={'text-accentMain'} taskData={singleItem} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Boardview