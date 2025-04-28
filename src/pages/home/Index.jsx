import React from 'react'
import { auth, db } from '../../../Database/FirebaseConfig'

const Inbox = () => {
  console.log(auth, db)
  return (
    <div className='h-full w-full'>
      This is inbox
    </div>
  )
}

export default Inbox
