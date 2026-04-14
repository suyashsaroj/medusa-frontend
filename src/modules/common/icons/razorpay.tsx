import React from "react"

const Razorpay = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.076 21.337H2.47L8.628 2.66h4.607l-6.159 18.677zM21.53 2.66L13.845 21.337h-4.39l7.685-18.677h4.39z"
        fill="#072654"
      />
      <path
        d="M13.845 21.337l3.143-7.63-3.07-7.414h4.39l3.07 7.414-3.143 7.63h-4.39z"
        fill="#3395FF"
      />
    </svg>
  )
}

export default Razorpay
