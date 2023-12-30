import React from 'react'
import logo from '../../assests/chat.png'
import './welcome.css'

const Welcome = () => {
  return (
    <div className='welcome-container'>
        <img src={logo} alt="logo" className='welcome-logo'/>
        <p>View and text directly to people present in the chat Rooms.</p>
    </div>
  )
}

export default Welcome
