import React from 'react'
import TasklistSection from '../common/TasklistSection';
import { GetMilliseconds } from '../../utils/utils';
import TaskCard from '../common/TaskCard';
const Boardview = ({ taskData }) => {
    console.log(taskData);
    // const todayMs = GetMilliseconds(new Date().toDateString());
    return (
        <div className='bg-red-70 flex justify-center  items-center gap-2'>
            <div className='flex justify-around h-screen  w-[90%] gap-5 '>
                {taskData?.map(({ name, data }) => (
                    <div className='w-1/3 h-[70%] overflow-hidden '>
                        <h1 className={`text-2xl font-semibold border-b-2 pb-4 mb-2 border-[rgba(0,0,0,0.27)] py-1 text-black`}>{name}</h1>
                        <div className='flex flex-col gap-2 h-[88%] overflow-y-scroll overflow-x-hidden ' style={{scrollbarWidth:"none"}}>
                            {
                                data?.map((task, idx, arr) => {
                                    return <div className='border rounded-lg border-[rgba(0,0,0,0.15)] '>
                                        <TaskCard key={task.id} taskData={task} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Boardview