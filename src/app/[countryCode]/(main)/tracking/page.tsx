"use client"

import { useState } from "react"
import { Button, Container, Heading, Text } from "@medusajs/ui"

type TrackingStatus = {
  status: string
  message: string
  timestamp?: string
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [trackingData, setTrackingData] = useState<TrackingStatus | null>(null)

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID or AWB number")
      return
    }

    setLoading(true)
    setError(null)
    setTrackingData(null)

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
        process.env.MEDUSA_BACKEND_URL ||
        "http://localhost:9000"

      const res = await fetch(
        `${backendUrl}/store/shipping/track?awb=${encodeURIComponent(trackingId)}`,
        {
          headers: {
            "x-publishable-api-key":
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to fetch tracking information")
        return
      }

      setTrackingData({
        status: data.tracking?.current_status || "In Transit",
        message:
          data.tracking?.shipment_status_text || "Shipment is being processed",
        timestamp: data.tracking?.etd || undefined,
      })
    } catch {
      setError("Unable to connect to tracking service. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-lg">
        <Heading level="h1" className="text-3xl mb-2">
          Track Your Order
        </Heading>
        <Text className="text-ui-fg-subtle mb-8">
          Enter your AWB number or shipment ID to track your delivery
        </Text>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            placeholder="Enter AWB or Shipment ID"
            className="flex-1 px-4 py-2 border border-ui-border-base rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button onClick={handleTrack} isLoading={loading}>
            Track
          </Button>
        </div>

        {error && (
          <Container className="bg-red-50 border border-red-200 p-4 rounded-md mb-4">
            <Text className="text-red-700">{error}</Text>
          </Container>
        )}

        {trackingData && (
          <Container className="border border-ui-border-base p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <Heading level="h3" className="text-lg">
                {trackingData.status}
              </Heading>
            </div>
            <Text className="text-ui-fg-subtle mb-2">
              {trackingData.message}
            </Text>
            {trackingData.timestamp && (
              <Text className="text-sm text-ui-fg-muted">
                Estimated delivery: {trackingData.timestamp}
              </Text>
            )}
          </Container>
        )}

        <div className="mt-12 border-t border-ui-border-base pt-8">
          <Heading level="h3" className="text-lg mb-4">
            Shipping Information
          </Heading>
          <div className="space-y-3 text-sm text-ui-fg-subtle">
            <div className="flex items-start gap-2">
              <span className="font-medium text-ui-fg-base min-w-[140px]">
                Delivery Partner:
              </span>
              <span>Shiprocket (Multiple courier partners)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-ui-fg-base min-w-[140px]">
                Delivery Time:
              </span>
              <span>3-7 business days (depending on location)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-ui-fg-base min-w-[140px]">
                Coverage:
              </span>
              <span>Pan-India delivery with 29,000+ pin codes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
