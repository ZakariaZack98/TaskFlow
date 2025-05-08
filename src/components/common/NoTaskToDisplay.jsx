import React from 'react'
import { useLocation } from 'react-router-dom'
import { auth } from '../../../Database/FirebaseConfig';

const NoTaskToDisplay = () => {
  const location = useLocation();
  const path = location.pathname;
  const username = auth.currentUser.displayName.split(' ')[auth.currentUser.displayName.split(' ').length - 1];

  const getArt = () => {
    if(path === '/') {
      return '/images/NoPendingTask.png'
    } else if(path === '/today') {
      return '/images/PeaceOfMind.png'
    } else if(path === '/upcoming') {
      return '/images/NoUpcoming.png'
    }
  }

  console.log(path)
  return (
    <div className='flex flex-col justify-center items-center w-100 -translate-y-30'>
      <picture>
        <img src={getArt()} className='h-[25dvh]' />
      </picture>
      <div className="textSec text-center">
        <p>You're all done for the {path === '/today' ? 'day' : 'week'}, {username}! <br />
        Enjoy the rest of your {path === '/today' ? 'day' : 'week'} and don't forget to share your <span className='text-accentMain'>#TaskFlowZero</span> awesomeness </p>
      </div>
    </div>
  )
}

export default NoTaskToDisplay