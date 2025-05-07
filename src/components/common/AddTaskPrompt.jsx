import React, { useContext, useState } from 'react'
import DateSelector from './DateSelector'
import ProjectSelector from './ProjectSelector'
import PrioritySelector from './PrioritySelector'
import { IoMdCloseCircle } from 'react-icons/io'
import BtnPrimary from './BtnPrimary'
import { FaPlusCircle } from 'react-icons/fa'
import { GetMilliseconds, GetTimeNow } from '../../utils/utils'
import { push, ref, set } from 'firebase/database'
import { auth, db } from '../../../Database/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TaskContext } from '../../contexts/TaskContext'

const AddTaskPrompt = ({ isSubTask, motherTaskId }) => {
  console.log(isSubTask, motherTaskId)
  const { allTaskData } = useContext(TaskContext);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date().toDateString().split(' ').slice(0, 3).join(' '));
  const [project, setProject] = useState('Personal');
  const [priority, setPriority] = useState(3);
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (title.length === 0) {
      toast.error(`Task with empty title can't be added`);
      return;
    }
    let newTask;
    if(isSubTask && motherTaskId) {
      newTask = {
        title,
        motherTaskId,
        id: Date.now(),
        createdAt: GetTimeNow()
      }
    } else {
      newTask = {
        title,
        desc,
        date,
        project,
        priority,
        id: Date.now(),
        status: 'pending',
        deadline: GetMilliseconds(date + ` ${new Date().toString().split(' ')[3]}`), //! Tempfix: Adding the year to complete the format
        createdAt: GetTimeNow()
      }
    }
    let newActivity;
    if (isSubTask && motherTaskId) {
      newActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: 'add',
        taskId: newTask.id,
        motherTaskId,
        taskTitle: title,
        motherTaskTitle: allTaskData.find(task => task.id === motherTaskId).title || 'N/A',
        message: `You have added a new subtask- `
      }
    } else {
      newActivity = {
        createdAt: GetTimeNow(),
        timeStamp: Date.now(),
        type: 'add',
        taskId: newTask.id,
        taskTitle: title,
        message: `You have added a new task- `
      }
    }
    const taskRef = ref(db, `tasks/${auth.currentUser?.uid}/${newTask.id}`);
    const activityRef = ref(db, `/activity/${auth.currentUser?.uid}`);
    let subTaskRef;
    if (isSubTask && motherTaskId) {
      subTaskRef = ref(db, `tasks/${auth.currentUser?.uid}/${motherTaskId}/subTasks/${newTask.id}`);
    }
    try {
      if (isSubTask && motherTaskId) {
        await Promise.all([set(subTaskRef, newTask), push(activityRef, newActivity)]);
        toast.success('Task Added')
      } else {
        await Promise.all([set(taskRef, newTask), push(activityRef, newActivity)]);
        toast.success('Task Added')
        navigate('/'); //? switching to inbox afer adding a task
      }
    } catch (err) {
      console.error('Error adding task:', err.message)
    } finally {
      setTitle('');
      setDesc('');
      setPriority(3);
      setDate(new Date().toDateString().split(' ').slice(0, 3).join(' '));
      setProject('Personal');
      setOpenPrompt(false);
    }
  }

  return (
    <div className='relative'>
      <div className="flex items-center gap-x-2 cursor-pointer mt-5" onClick={() => setOpenPrompt(prev => !prev)}>
        <span className='text-accentMain text-2xl'>
          <FaPlusCircle />
        </span>
        {isSubTask ? (
          <p className='text-accentMain'>Add Sub-Tasks</p>
        ) : (
          <p className='text-accentMain'>Add Tasks</p>
        )}
      </div>
      {
        openPrompt && (
          <div className={`rounded-lg ps-3 pt-3 pe-3 ${isSubTask ? 'pb-3' : ''} w-full bg-white border border-fontSecondery flex flex-col gap-y-1 mt-3 absolute z-30 min-w-180`} style={{ boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.1)' }}>
            <span className='absolute right-4 top-4 text-accentMain text-2xl cursor-pointer' onClick={() => setOpenPrompt(false)}>
              <IoMdCloseCircle />
            </span>
            <input type="text" placeholder='Task name' className='font-semibold w-full focus:outline-0' value={title} onChange={e => setTitle(e.target.value)} />
            {
              !isSubTask && (
                <input type="text" placeholder='Description' className='text-sm w-full focus:outline-0' value={desc} onChange={e => setDesc(e.target.value)} />
              )
            }
            <div className="flex justify-between">
              {
                !isSubTask && (
                  <>
                    <div className="selectionGroup flex items-center gap-x-2">
                      <div className="mx-3">
                        <DateSelector date={date} setDate={setDate} />
                      </div>
                      <ProjectSelector project={project} setProject={setProject} />
                      <PrioritySelector priority={priority} setPriority={setPriority} />
                    </div>
                  </>
                )
              }
              <div className={`${!isSubTask ? 'translate-y-6' : 'translate-y-1'} `}>
                <BtnPrimary label={'Add Task'} clickHandler={() => handleAddTask()} />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AddTaskPrompt