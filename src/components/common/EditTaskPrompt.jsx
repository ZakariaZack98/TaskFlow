import React, { useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import BtnPrimary from './BtnPrimary';
import DateSelector from './DateSelector';
import ProjectSelector from './ProjectSelector';
import PrioritySelector from './PrioritySelector';
import { ref, set } from 'firebase/database';
import { db } from '../../../Database/FirebaseConfig';

const EditTaskPrompt = ({ taskData, setOpenEditPrompt }) => {
  const [title, setTitle] = useState(taskData?.title || '');
  const [desc, setDesc] = useState(taskData?.desc || '');
  const [date, setDate] = useState(taskData.date);
  const [project, setProject] = useState(taskData.project);
  const [priority, setPriority] = useState(taskData.priority);

  const updateTask = async () => {
    const updatedTask = {
      title,
      desc,
      date,
      project,
      priority,
      id: taskData.id,
      status: 'pending',
      deadline: date,
      createdAt: taskData.createdAt
    }
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${taskData.id}`);
    try {
      await set(taskRef, updatedTask);
      setTitle('');
      setDesc('');
      setPriority(3);
      setDate(new Date().toDateString().split(' ').slice(0, 3).join(' '));
      setProject('Personal');
      setOpenEditPrompt(false);
      console.log('Task updated successfully');
    } catch (err) {
      console.error('Error updating task:', err.message)
    } finally {
      setOpenEditPrompt(false);
    }
  }

  return (
    <div className='absolute bg-white w-[40%] cursor-pointer ps-3 pt-3 pe-3 rounded-xl border z-30'>
      <span className='absolute right-4 top-4 text-accentMain text-3xl' onClick={() => setOpenEditPrompt(false)}>
        <IoMdCloseCircle />
      </span>
      <input type="text-2xl" placeholder='Task name' className='font-semibold w-full focus:outline-0' value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text-sm" placeholder='Description' className='text-sm w-full focus:outline-0' value={desc} onChange={e => setDesc(e.target.value)} />
      <div className="flex justify-between">
        <div className="selectionGroup flex items-center gap-x-2">
          <div className="mx-3">
            <DateSelector date={date} setDate={setDate} />
          </div>
          <ProjectSelector project={project} setProject={setProject} />
          <PrioritySelector priority={priority} setPriority={setPriority} />
        </div>
        <div className=" translate-y-6">
          <BtnPrimary label={'Update Task'} clickHandler={() => updateTask()} />
        </div>
      </div>
    </div>
  )
}

export default EditTaskPrompt