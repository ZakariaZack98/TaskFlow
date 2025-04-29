import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CommonLayout from './components/CommonLayout'
import Inbox from './pages/home/Index'
import Today from './pages/Today/Today'
import Upcoming from './pages/Upcoming/Upcoming'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import TaskPage from './pages/TaskPage/TaskPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CommonLayout/>}>
          <Route index element={<Inbox/>}/>
          <Route path='/today' element={<Today/>}/>
          <Route path='/upcoming' element={<Upcoming/>}/>
        </Route>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path= '*' element={<TaskPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
