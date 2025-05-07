import React, { createContext, useState } from 'react'

const TaskContext = createContext();

const TaskProvider = ({children}) => {
  const [allTaskData, setAllTaskData] = useState([]);
  const [boardView, setBoardView] = useState(false);
  return (
    <TaskContext.Provider value={{allTaskData, setAllTaskData, boardView, setBoardView}}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }