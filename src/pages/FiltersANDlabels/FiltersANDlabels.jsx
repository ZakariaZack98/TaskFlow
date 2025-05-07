import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import TaskCard from '../../components/common/TaskCard'
import AddTaskPrompt from '../../components/common/AddTaskPrompt'

const FiltersANDlabels = () => {
  const { allTaskData } = useContext(TaskContext)
  const [filterData, setfilterData] = useState([])

  // When allTaskData fetch succesfully, then filtered the data
  useEffect(() => {
    let filterDataBlankArr = []

    filterDataBlankArr.push({ name: "Personal", data: allTaskData?.filter(task => task.project === "Personal") });
    filterDataBlankArr.push({ name: "Shopping", data: allTaskData?.filter(task => task.project === "Shopping") });
    filterDataBlankArr.push({ name: "Works", data: allTaskData?.filter(task => task.project === "Works") });
    filterDataBlankArr.push({ name: "Errands", data: allTaskData?.filter(task => task.project === "Errands") });

    setfilterData(filterDataBlankArr);
  }, [allTaskData])

  return (
    <>
      <div className="heading w-[90%] mx-auto pb-5">
        <h1 className='text-3xl font-bold'>Inbox</h1>
        <AddTaskPrompt />
      </div>
      <div className='bg-red-70 flex justify-center  items-center gap-2'>
        <div className='flex justify-around h-screen  w-[90%] gap-5 '>
          {filterData?.map(({ name, data }) => (
            <div className='w-1/3 h-[70%] overflow-hidden '>
              <h1 className={`text-2xl font-semibold border-b-2 pb-4 mb-2 border-[rgba(0,0,0,0.27)] py-1 text-black`}>{name}</h1>
              <div className='flex flex-col gap-2 h-[88%] overflow-y-scroll overflow-x-hidden ' style={{ scrollbarWidth: "none" }}>
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
    </>
  )
}

export default FiltersANDlabels
