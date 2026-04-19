import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

import { GET_PLUSH_DATA } from "@lib/util/plush-mapper"

const ProductInfo = ({ product }: ProductInfoProps) => {
  const plushData = GET_PLUSH_DATA(product.id!)
  const displayTitle = plushData ? plushData.title : product.title
  const displayDescription = plushData ? plushData.description : product.description

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-6 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-sm font-bold text-secondary uppercase tracking-widest bg-secondary-container/30 w-fit px-4 py-1 rounded-full border border-secondary/10"
          >
            {product.collection.title === "Electronics" ? "Studio Picks" : product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="text-5xl font-headline text-primary puffy-text lowercase tracking-tighter leading-[1.1]"
          data-testid="product-title"
        >
          {displayTitle}
        </Heading>

        <Text
          className="text-lg text-primary/70 font-medium leading-relaxed whitespace-pre-line"
          data-testid="product-description"
        >
          {displayDescription}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo
