import React from 'react'
import './message.css'
import { motion } from "framer-motion"


const Messageother = ({props}) => {
  return (
    <motion.div whileHover={{scale:1.04}} className='message-others-con'>
      
      <div className='message-other-icon'>
        <img src={`data:image/svg+xml;base64,${props.sender.avatarImage}`} alt="" width={"40px"} height={"40px"}/>
      </div>
      <div className='message-other-container'>
        <div className='message-other-title'>
            {props.sender.name}
        </div>
        <div className='message-other-message'>
          {props.content}
        </div>
      </div>
    </motion.div>
  )
}

export default Messageother