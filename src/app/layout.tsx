import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Plus_Jakarta_Sans } from "next/font/google"
import SparkleTrail from "@modules/common/components/sparkle-trail"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans", // Optional: if you want to use it as a CSS variable
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "PlushYo | Premium Handmade Plushies & Puffy Accessories",
    template: "%s | PlushYo",
  },
  description:
    "Welcome to PlushYo, a world of hand-stitched magic. From huggable fluffs to puffy protective gear, discover premium accessories crafted with love.",
  keywords: [
    "plushies",
    "handmade toys",
    "puffy phone cases",
    "soft accessories",
    "stuffed animals",
    "premium gifts",
    "PlushYo",
  ],
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={plusJakartaSans.className}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SparkleTrail />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
