import { ShoppingBag } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-4xl leading-12 text-ui-fg-base font-semibold"
          >
            Shop the Best of India
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-10 text-ui-fg-subtle font-normal mt-2"
          >
            Premium products with fast delivery, secure payments via Razorpay
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <Button variant="primary" className="mt-4">
            Browse Products
            <ShoppingBag />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
