import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Desi Cart | Indian Ecommerce Store",
    template: "%s | Desi Cart",
  },
  description:
    "Premium Indian ecommerce store with secure Razorpay payments, fast Shiprocket shipping, and a curated collection of quality products.",
  keywords: [
    "ecommerce",
    "india",
    "online shopping",
    "razorpay",
    "shiprocket",
  ],
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
