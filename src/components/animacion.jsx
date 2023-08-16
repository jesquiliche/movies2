import React from 'react'
import { motion } from 'framer-motion';

const Animacion = ({children}) => {
  return (
    <motion.div
    className="items-center"
    initial={{ opacity: 0.5, scale: 0.3}}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0,scale: 0.2 }}
    transition={{ duration: 0.5 }}
  >
      {children}
    </motion.div>
  )
}

export default Animacion;
