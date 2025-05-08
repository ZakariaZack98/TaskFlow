import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../../contexts/TaskContext'
import TaskCard from '../../components/common/TaskCard'

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
      <div className="heading w-[80%] h-2/10 mx-auto pb-5">
        <h1 className='text-3xl font-bold'>Filters & Labels</h1>
      </div>
      <div className='bg-red-70 flex justify-center items-center gap-2'>
        <div className=' flex flex-wrap flex-col h-screen w-[80%] gap-3 '>
          {filterData?.map(({ name, data }) => (
            <div className='w-1/2 h-[40%] shadow-md rounded-xl bg-[rgba(255,0,0,0.04)] overflow-hidden'>
              <h1 className={`text-2xl  font-semibold border-b-2 mb-2 border-[rgba(0,0,0,0.27)] px-2 py-1 text-white bg-[#a1141481]`}>{name}</h1>
              <div className='flex flex-col gap-2 h-[92%] overflow-y-scroll p-3 ' style={{ scrollbarWidth: "none" }}>
                {
                  data?.map((task, idx, arr) => {
                    return <div className='border rounded-lg bg-[#ffffff2c] border-[rgba(0,0,0,0.15)] '>
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
