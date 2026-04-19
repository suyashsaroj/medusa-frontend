"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PlushState } from '@lib/hooks/use-emotional-state'

interface PlushCompanionProps {
  state: PlushState
  mousePos: { x: number, y: number }
}

const PlushCompanion: React.FC<PlushCompanionProps> = ({ state, mousePos }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-40 select-none"
      animate={{
        x: mousePos.x - 100,
        y: mousePos.y - 120,
        rotate: state === 'PLAYFUL' ? [0, 10, -10, 0] : 0,
        scale: state === 'SLEEPING' ? 0.8 : 1,
      }}
      transition={{
        type: 'spring',
        damping: state === 'PLAYFUL' ? 10 : 30,
        stiffness: state === 'PLAYFUL' ? 200 : 100,
        rotate: { repeat: state === 'PLAYFUL' ? Infinity : 0, duration: 0.3 }
      }}
    >
      <div className="relative">
        <Image 
          src="/images/companion.png"
          alt="Companion Plush"
          width={240}
          height={280}
          className="drop-shadow-2xl"
        />
        
        {/* Sleeping Bubbles */}
        <AnimatePresence>
          {state === 'SLEEPING' && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -50, x: [0, 10, 0] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 right-0 text-white font-bold text-2xl"
            >
              zzz
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playful Sparkles */}
        <AnimatePresence>
          {state === 'PLAYFUL' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-full border-4 border-dashed border-white/20 rounded-full animate-spin-slow"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default PlushCompanion
