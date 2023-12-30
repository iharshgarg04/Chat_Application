import React from 'react'
import './message.css'
import { motion } from "framer-motion"
const Messageself = () => {

    const data = {
        message:"This is a sample message",
        timestamp:"12:09",
    }

  return (
    <div className='main-self'>
        <motion.div whileHover={{scale:1.04}} className='message-self-container'>
            <div className='message-self'>
                {data.message}
            </div>
            <div className='self-timestamp'>
                {data.timestamp}
            </div>
        </motion.div>
    </div>
  )
}

export default Messageself