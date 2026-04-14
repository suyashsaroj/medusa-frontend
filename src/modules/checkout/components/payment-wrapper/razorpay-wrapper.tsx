"use client"

import { HttpTypes } from "@medusajs/types"
import { createContext } from "react"

type RazorpayWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession
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
