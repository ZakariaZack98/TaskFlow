import React, { useState } from 'react'
import BtnPrimary from './BtnPrimary'
import { ref, set } from 'firebase/database'
import { auth, db } from '../../../Database/FirebaseConfig'
import { toast } from 'react-toastify'

const EditSubTaskPrompt = ({subTaskData, setOpenEditPrompt}) => {
  const [title, setTitle] = useState(subTaskData.title)

  const updateSubTask = async () => {
    const subTaskTitleRef = ref(db, `tasks/${auth.currentUser?.uid}/${subTaskData.motherTaskId}/subTasks/${subTaskData.id}/title`);
    try {
      await set(subTaskTitleRef, title)
      toast.success('Subtask update successful.')
    } catch (error) {
      toast.error('Error updating task', error.message)
    } finally {
      setOpenEditPrompt(false);
      setTitle('')
    }
  }

  return (
    <div className='w-full flex items-center gap-x-1 bg-white p-2 rounded-md border border-fontSecondery' style={{boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.1)'}}>
      <input type="text" value={title} className=' px-2 py-1 rounded-md w-7/10 border-2 border-accentMain min-w-[20dvw]' onChange={e => setTitle(e.target.value)}/>
      <BtnPrimary label={'Update Task'} clickHandler={() => updateSubTask()} colorClass={'bg-green-700'}/>
      <BtnPrimary label={'Cancel'} clickHandler={() => {
        setOpenEditPrompt(false);
        setTitle('');
        }} colorClass={'bg-gray-700'}/>
    </div>
  )
}

export default EditSubTaskPrompt