import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { IconButton } from "@mui/material";
import React from "react";
import "./creategroup.css";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"

const Creategroup = () => {
  return (
    <AnimatePresence>
      <motion.div 
      initial={{ opacity:0,scale:0 }}
      animate = {{opacity:1 , scale:1}}
      exit={{opacity:0 , scale:0}}
      transition={{
        ease:"anticipate",
        duration:"0.3"
      }}
       className="createGroups-container">
        <input
          type="text"
          placeholder="Enter Group Name"
          className="search-box"
        />

        <IconButton>
          <DoneOutlineIcon />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default Creategroup;
