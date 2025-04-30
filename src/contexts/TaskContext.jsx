import React, { createContext, useState } from 'react'

const TaskContext = createContext();

//! Remember to reset all states after logout

const TaskProvider = ({children}) => {
  const [allTaskData, setAllTaskData] = useState([]);
  return (
    <TaskContext.Provider value={{allTaskData, setAllTaskData}}>
      {children}
    </TaskContext.Provider>
  )
}

export { TaskContext, TaskProvider }