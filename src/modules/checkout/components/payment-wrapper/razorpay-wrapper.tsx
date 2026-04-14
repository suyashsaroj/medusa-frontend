"use client"

import { createContext } from "react"

type RazorpayWrapperProps = {
  children: React.ReactNode
}

export const RazorpayContext = createContext(false)

const RazorpayWrapper: React.FC<RazorpayWrapperProps> = ({
  children,
}) => {
  return (
    <RazorpayContext.Provider value={true}>
      {children}
    </RazorpayContext.Provider>
  )
}

export default RazorpayWrapper
