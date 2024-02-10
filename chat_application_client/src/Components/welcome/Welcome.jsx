import React from 'react'
import logo from '../../assests/chating.svg'
import './welcome.css'
import Cookies from 'js-cookie';

const Welcome = () => {
  const userData = JSON.parse(Cookies.get("userData"));
  return (
    <div className='welcome-container'>
        <img src={logo} alt="logo" className='welcome-logo'/>
        <p>Welcome {userData.data.name} </p>
        <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  )
}

export default Welcome
