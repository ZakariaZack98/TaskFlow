import React, { useContext } from 'react'
import { TaskContext } from '../../contexts/TaskContext'

const FiltersANDlabels = () => {
    const {allTaskData} = useContext(TaskContext)
    console.log(allTaskData);
    
  return (
    <div>
      from FiltersANDlabels sabbirhit .
    </div>
  )
}

export default FiltersANDlabels
