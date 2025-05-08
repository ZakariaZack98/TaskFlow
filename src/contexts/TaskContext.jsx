import React, { createContext, useState } from 'react'

const TaskContext = createContext();

const TaskProvider = ({children}) => {
  const [allTaskData, setAllTaskData] = useState([]);
  const [allCompletedTask, setAllCompletedTask] = useState([]);
  const [boardView, setBoardView] = useState(false);
  return (
    <TaskContext.Provider value={{allTaskData, setAllTaskData, boardView, setBoardView, allCompletedTask, setAllCompletedTask}}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }