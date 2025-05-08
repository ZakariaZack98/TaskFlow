import React from 'react'

const LocationPrompt = ({location = "", setLocation, setOpenLocationPrompt}) => {
  return (
    <div className='w-full mt-3 relative z-50 bg-white'>
      <input type="text" className='w-full rounded-md border border-fontSecondery focus:outline-none px-2 py-1' placeholder='type a location...' onKeyDown={e => {
        if(e.key === 'Enter') {
          setLocation(e.target.value);
          e.target.value = '';
          setOpenLocationPrompt(false);
        }
      }}/>
    </div>
  )
}

export default LocationPrompt