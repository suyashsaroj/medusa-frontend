"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEmotionalState } from '@lib/hooks/use-emotional-state'
import NightSky from '../night-sky'
import PlushCompanion from './plush-companion'
import { GET_PLUSH_DATA, PLUSH_MAPPER } from '@lib/util/plush-mapper'
import Thumbnail from '@modules/products/components/thumbnail'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

const EmotionalHero: React.FC = () => {
  const { state, mousePos } = useEmotionalState()
  const [journeyPhase, setJourneyPhase] = useState<'INTERACT' | 'TRANSITION' | 'DISCOVERY'>('INTERACT')
  const [showProducts, setShowProducts] = useState(false)

  // Web Audio Lullaby Logic
  const playLullaby = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContext) return
      
      const audioCtx = new AudioContext()
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, startTime)
        
        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.05, startTime + 0.5)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
        
        osc.start(startTime)
        osc.stop(startTime + duration)
      }

      // Simple lullaby sequence
      const now = audioCtx.currentTime
      playNote(440, now, 4) // A4
      playNote(523.25, now + 2, 4) // C5
      playNote(392, now + 4, 4) // G4
      playNote(440, now + 6, 4) // A4
    } catch (e) {
      console.error("Audio failed", e)
    }
  }

  useEffect(() => {
    // Start Journey Timer
    const transitionTimer = setTimeout(() => {
      setJourneyPhase('TRANSITION')
      playLullaby()
    }, 15000)

    const discoveryTimer = setTimeout(() => {
      setJourneyPhase('DISCOVERY')
      setShowProducts(true)
    }, 25000)

    return () => {
      clearTimeout(transitionTimer)
      clearTimeout(discoveryTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] w-full h-full overflow-hidden flex items-center justify-center cursor-none bg-black">
      <NightSky />
      <PlushCompanion state={state} mousePos={mousePos} />

      {/* Narrative Elements */}
      <AnimatePresence>
        {journeyPhase === 'TRANSITION' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 text-center space-y-4"
          >
            <h2 className="text-white text-5xl font-headline italic opacity-80 puffy-text mb-8">Rough day?</h2>
            <div className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 text-white/50 text-xs tracking-widest uppercase">
              Stay with me for a bit
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Dimmer during transition */}
      <motion.div 
        className="fixed inset-0 bg-black/40 z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: journeyPhase !== 'INTERACT' ? 1 : 0 }}
        transition={{ duration: 5 }}
      />

      {/* Organic Product Discovery */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showProducts && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full px-12">
              {Object.keys(PLUSH_MAPPER).map((id, index) => {
                const data = PLUSH_MAPPER[id]
                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: index * 1.5, duration: 4 }}
                    className="pointer-events-auto"
                  >
                    <LocalizedClientLink href={`/products/${data.handle}`} className="block group">
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:bg-white/10 hover:-translate-y-4">
                        <div className="aspect-[11/14] rounded-[2rem] overflow-hidden mb-6 stitch-border">
                          <Thumbnail thumbnail={data.thumbnail} size="full" />
                        </div>
                        <h3 className="text-white font-headline text-2xl lowercase puffy-text tracking-tighter">{data.title}</h3>
                        <p className="text-white/40 text-xs italic mt-2">Emerging thoughts...</p>
                      </div>
                    </LocalizedClientLink>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Cursor Circle */}
      <motion.div 
        className="fixed w-8 h-8 border-2 border-white/20 rounded-full z-50 pointer-events-none"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      />
    </div>
  )
}

export default EmotionalHero
