"use client"

import { useEffect } from "react"

const SparkleTrail = () => {
  useEffect(() => {
    const colors = ["#9bdcc4", "#f0c1e1", "#ffccb6", "#a9ead2"]

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div")
      sparkle.className = "fixed pointer-events-none z-[9999] opacity-0"
      sparkle.style.left = `${x}px`
      sparkle.style.top = `${y}px`
      sparkle.innerHTML = Math.random() > 0.5 ? "✦" : "•"

      const size = Math.random() * 10 + 10
      sparkle.style.fontSize = `${size}px`
      sparkle.style.color = colors[Math.floor(Math.random() * colors.length)]

      document.body.appendChild(sparkle)

      const destinationX = (Math.random() - 0.5) * 60
      const destinationY = (Math.random() - 0.5) * 60

      const animation = sparkle.animate(
        [
          { transform: "translate(0, 0) scale(0) rotate(0deg)", opacity: 0 },
          { transform: "translate(0, 0) scale(1.2) rotate(0deg)", opacity: 1, offset: 0.2 },
          { transform: `translate(${destinationX}px, ${destinationY}px) scale(0) rotate(180deg)`, opacity: 0 },
        ],
        {
          duration: 1000 + Math.random() * 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        }
      )

      animation.onfinish = () => sparkle.remove()
    }

    let lastSparkleTime = 0

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastSparkleTime > 50) { // Limit to 20 sparkles per second
        createSparkle(e.clientX, e.clientY)
        lastSparkleTime = now
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return null
}

export default SparkleTrail
