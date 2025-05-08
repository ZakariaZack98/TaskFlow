import React, { useState } from 'react'
import RoundedCheckbox from './RoundedCheckbox'
import { GoPencil } from 'react-icons/go'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { ref, remove, update } from 'firebase/database'
import { auth, db } from '../../../Database/FirebaseConfig'
import { toast } from 'react-toastify'
import EditSubTaskPrompt from './EditSubTaskPrompt'

const SubTaskCard = ({ subTaskData, motherTaskId }) => {
  const [openEditPrompt, setOpenEditPrompt] = useState(false);

  const removeSubTask = async () => {
    const subTaskRef = ref(db, `tasks/${auth.currentUser?.uid}/${motherTaskId}/subTasks/${subTaskData.id}`)
    try {
      await remove(subTaskRef);
      toast.warn(`Task deleted`)
    } catch (error) {
      toast.error('Error deleting task', error.message)
    }
  }

  const completeSubTask = () => {
    const subTaskRef = ref(db, `tasks/${auth.currentUser?.uid}/${motherTaskId}/subTasks/${subTaskData.id}`);
    try {
      update(subTaskRef, { status: "complete" })
        .then(() => {
          setTimeout(() => {
            remove(subTaskRef)
              .then(() => {
                toast.success(`Task marked as complete`)
              })
              .catch((error) => {
                toast.error('Error completing task', error.message)
              })
          }, 500);
        });
    } catch (error) {
      toast.error('Error updating task status', error.message)
    }
  }

  return (
    <div className='relative flex justify-between items-center py-2'>
      {
        openEditPrompt && (
          <div className="absolute top-0 left-0" style={{zIndex: 999}}>
            <EditSubTaskPrompt subTaskData={subTaskData} setOpenEditPrompt={setOpenEditPrompt}/>
          </div>
        )
      }
      <div className="left flex items-center">
        <span onClick={() => completeSubTask()}>
          <RoundedCheckbox />
        </span>
        <p>{subTaskData.title}</p>
      </div>
      <div className="right flex gap-x-2 text-xl">
        <span className='cursor-pointer' onClick={() => setOpenEditPrompt(prev => !prev)}>
          <GoPencil/>
        </span>
        <span className='text-red-600 cursor-pointer' onClick={() => removeSubTask()}>
          <BsFillTrash3Fill />
        </span>
      </div>
    </div>
  )
}

export default SubTaskCard