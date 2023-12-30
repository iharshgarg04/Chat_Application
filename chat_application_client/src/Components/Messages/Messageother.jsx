import React from 'react'
import './message.css'
import { motion } from "framer-motion"


const Messageother = () => {
  const data = {name:"harsh" , timestamp:"12:09",message:"Hello harsh!! How r u"}
  return (
    <motion.div whileHover={{scale:1.04}} className='message-others-con'>
      <div className='message-other-icon'>
          <p>{data.name[0]}</p>
      </div>
      <div className='message-other-container'>
        <div className='message-other-title'>
          {data.name}
        </div>
        <div className='message-other-message'>
          {data.message}
        </div>
        <div className='message-other-time'>
          {data.timestamp}
        </div>
      </div>
    </motion.div>
  )
}

export default Messageother