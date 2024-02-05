import React from 'react'
import './message.css'
import { motion } from "framer-motion"
const Messageself = ({props}) => {

  return (
    <div className='main-self'>
        <motion.div whileHover={{scale:1.04}} className='message-self-container'>
            <div className='message-self'>
                {props.content}
            </div>
        </motion.div>
    </div>
  )
}

export default Messageself