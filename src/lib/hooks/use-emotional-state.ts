"use client"

import { useState, useEffect, useRef } from 'react'

export type PlushState = 'PLAYFUL' | 'COMPANION' | 'SLEEPING'

export const useEmotionalState = () => {
  const [state, setState] = useState<PlushState>('COMPANION')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const lastPos = useRef({ x: 0, y: 0 })
  const lastTime = useRef(Date.now())
  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      const dt = now - lastTime.current
      if (dt === 0) return

      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = distance / dt

      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Update state based on speed
      if (speed > 1.5) {
        setState('PLAYFUL')
      } else if (speed > 0.1) {
        setState('COMPANION')
      }

      // Reset Idle Timer
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => {
        setState('SLEEPING')
      }, 5000)

      lastPos.current = { x: e.clientX, y: e.clientY }
      lastTime.current = now
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [])

  return { state, mousePos }
}
