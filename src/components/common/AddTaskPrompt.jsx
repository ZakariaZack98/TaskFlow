import React, { useState } from 'react'
import DateSelector from './DateSelector'
import ProjectSelector from './ProjectSelector'
import PrioritySelector from './PrioritySelector'
import { IoMdCloseCircle } from 'react-icons/io'
import BtnPrimary from './BtnPrimary'
import { FaPlusCircle } from 'react-icons/fa'
import { GetDateNow, GetTimeNow } from '../../utils/utils'
import { ref, set } from 'firebase/database'
import { db } from '../../../Database/FirebaseConfig'

const AddTaskPrompt = () => {
  const [openPrompt, setOpenPrompt] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date().toDateString());
  const [project, setProject] = useState('Personal');
  const [priority, setPriority] = useState(3);

  const handleAddTask = async () => {
    const newTask = {
      title, 
      desc, 
      date: GetDateNow(), 
      project, 
      priority,
      id: Date.now(),
      status: 'pending',
      deadline: GetDateNow(),
      createdAt: GetTimeNow()
    }
    const taskRef = ref(db, `tasks/${newTask.id}`);
    try {
      await set(taskRef, newTask);
      setTitle('');
      setDesc('');
      setPriority(3);
      setDate(new Date());
      setProject('Personal');
      setOpenPrompt(false);
      console.log('Task added successfully');
    } catch(err) {
      console.error('Error adding task:', err.message)
    }
  }

  return (
    <div className='relative'>
      <div className="flex items-center gap-x-2 cursor-pointer mt-10" onClick={() => setOpenPrompt(prev => !prev)}>
        <span className='text-accentMain text-2xl'>
          <FaPlusCircle />
        </span>
        <p className='text-accentMain'>Add Task</p>
      </div>
      {
        openPrompt && (
          <div className='rounded-lg ps-3 pt-3 pe-3 w-full bg-white border border-fontSecondery flex flex-col gap-y-1 mt-3 relative'>
            <span className='absolute right-4 top-4 text-accentMain text-2xl cursor-pointer' onClick={() => setOpenPrompt(prev => !prev)}>
              <IoMdCloseCircle />
            </span>
            <input type="text" placeholder='Task name' className='font-semibold w-full focus:outline-0' value={title} onChange={e => setTitle(e.target.value)}/>
            <input type="text" placeholder='Description' className='text-sm w-full focus:outline-0' value={desc} onChange={e => setDesc(e.target.value)}/>
            <div className="flex justify-between">
              <div className="selectionGroup flex items-center gap-x-2">
                <div className="mx-3">
                  <DateSelector date={date} setDate={setDate}/>
                </div>
                <ProjectSelector project={project} setProject={setProject}/>
                <PrioritySelector priority={priority} setPriority={setPriority}/>
              </div>
              <div className=" translate-y-6">
                <BtnPrimary label={'Add Task'} clickHandler={() => handleAddTask()}/>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AddTaskPrompt