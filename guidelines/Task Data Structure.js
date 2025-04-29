//* =========================== TASK DATA STUCTURE FOR STORING IN DATABASE =============================== *//
{
  id: Date.now() //? UNIX Timestamp of when the task is created
  title: 'Buy Groceries' //? Main title of the task
  desc: 'Buy grocieries including rice, daal, vegitable, sugar etc. daily supplies' //? Task description
  date: '04 28 2025' //? date of the task in MM DD YYYY format
  reminder: '04 28 2025 05:33 pm' //? reminder/notification push time (ADVANCED FEATURE)
  place: 'At shwapno supershop' //? place (ADVANCED FEATURE)
  deadline: '04 30 2025' //? deadline of the task in MM DD YYYY format (ADVANCED FEATURE)
  category: 'Personal' //? category of the task
  status: 'Pending' //? status of the task pending/complete/due
  comments: [{ //? comments added to the tasks including attachments (image file, voice)
    text: `this is the shopping list`,
    imgUrl: "https://dummyimage.com/dummypic.jpeg",
    voiceUrl: "" //* ADVANCED FEATURE
  }, {...more}]
  subtasks: [ //? if any subtask is assigned to the main task (similiar structure as the main task)
    {id, title, desc, ...same}
  ]
  activity: [ //* USED FOR NOTIFICATIONS
    {
      time: '04 28 2025 08:33:32 am', //? when the activity happened
      activity: 'added a comment to the task' //? what happened
    }, {...more}
  ]
}

//** NOTE: ALL THE PROPERTIES OF THE OBJECTS WILL BE USED AS PROPS INSIDE THE COMPONENTS OF THE TASKFLOW APP, SO KEEP THE PROPS NAME SAME AS THIS OBJECT PROPERTY NAMES **/

// ===============================================================================================================//
