"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Star } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const [isJumping, setIsJumping] = useState(false)

  const handleBoxClick = () => {
    setIsJumping(true)
    setTimeout(() => setIsJumping(false), 600)
    // Confetti logic would go here - for now we'll trigger the animation
  }

  return (
    <div className="min-h-[90vh] w-full flex flex-col items-center justify-center pt-32 px-6 relative overflow-hidden">
      {/* Hero Content */}
      <div className="text-center space-y-12 max-w-4xl z-10">
        <div className="relative inline-block">
          <Heading
            level="h1"
            className="text-7xl md:text-9xl font-black font-headline tracking-tighter text-primary puffy-text uppercase leading-tight"
          >
            Plush<br />Magic
          </Heading>
          <div className="absolute -top-4 -right-8 bg-secondary-container/80 backdrop-blur-md px-6 py-2 rounded-full border-2 border-dashed border-secondary/30 rotate-12">
            <span className="text-secondary font-bold tracking-widest text-sm">HANDMADE</span>
          </div>
        </div>

        <p className="text-xl md:text-2xl text-primary font-medium leading-relaxed italic max-w-2xl mx-auto">
          We're stitching together memories, one fluff at a time. <br />
          <span className="text-secondary font-bold">Soft, snuggly, and purely yours.</span>
        </p>

        <div className="flex flex-col items-center gap-8">
          <LocalizedClientLink href="/store">
            <Button variant="primary" className="h-16 px-10 text-lg rounded-full shadow-lg hover:scale-105 transition-transform bg-primary border-none">
              Explore the Studio
              <ShoppingBag />
            </Button>
          </LocalizedClientLink>

          {/* Magic Box Section */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="text-primary-dim font-bold italic tracking-widest text-sm uppercase opacity-60">Tap for a surprise!</div>
            <div 
              onClick={handleBoxClick}
              aria-label="Interactive magic surprise box"
              role="button"
              tabIndex={0}
              className={`w-32 h-32 md:w-40 md:h-40 bg-secondary-container rounded-[2rem] shadow-[0_20px_40px_rgba(117,80,107,0.3)] border-4 border-dashed border-white/60 flex items-center justify-center cursor-pointer flap-felt relative overflow-hidden group ${isJumping ? 'animate-box-jump' : ''}`}
            >
              <span className="material-symbols-outlined text-5xl text-secondary group-hover:scale-110 transition-transform" aria-hidden="true">redeem</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
