import React, { createContext, useState } from 'react'

const TaskContext = createContext();

const TaskProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allTaskData, setAllTaskData] = useState([]);
  const [allCompletedTask, setAllCompletedTask] = useState([]);
  const [boardView, setBoardView] = useState(false);
  return (
    <TaskContext.Provider value={{currentUser, setCurrentUser, allTaskData, setAllTaskData, boardView, setBoardView, allCompletedTask, setAllCompletedTask}}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }