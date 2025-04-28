import React from 'react'

const BtnPrimary = ({label, colorClass, clickHandler}) => {
  return (
    <button className={`${colorClass ? colorClass : 'bg-accentMain'} px-4 py-1 rounded-xl text-white font-medium hover:bg-red-800 duration-200 cursor-pointer`}>
      {label}
    </button>
  )
}

export default BtnPrimary
