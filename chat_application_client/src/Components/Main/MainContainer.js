import React from 'react'
import SideBar from '../Sidebar/SideBar'
import './main.css'

import { Outlet } from 'react-router-dom'

const MainContainer = () => {
  return (
    <div className='main-container'>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default MainContainer