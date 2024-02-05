import React, { useState } from 'react'
import SideBar from '../Sidebar/SideBar'
import './main.css'
import { createContext } from 'react'
import { Outlet } from 'react-router-dom'

export const myContext = createContext();
const MainContainer = () => {
  const [refresh, setRefresh] = useState(true);
  return (
    <div className='main-container'>
      <myContext.Provider value={{refresh:refresh,setRefresh:setRefresh}} >
          <SideBar/>
          <Outlet/>
      </myContext.Provider>
    </div>
  )
}

export default MainContainer