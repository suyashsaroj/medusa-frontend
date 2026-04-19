import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"
import { IS_PLUSH_PRODUCT } from "@lib/util/plush-mapper"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  const filteredProducts = pricedProducts?.filter(p => IS_PLUSH_PRODUCT(p.id!))

  if (!filteredProducts || filteredProducts.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between items-end mb-12 border-b-4 border-dashed border-primary/5 pb-8">
        <div className="space-y-1">
          <Text className="text-4xl md:text-5xl font-headline text-primary puffy-text lowercase tracking-tight">
            {collection.title === "Electronics" ? "Studio Picks" : collection.title}
          </Text>
          <div className="h-2 w-24 bg-secondary-container rounded-full"></div>
        </div>
        <InteractiveLink 
          href={`/collections/${collection.handle}`}
          className="hover:scale-105 transition-transform duration-200"
        >
          See more fluffs
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 small:grid-cols-3 gap-x-12 gap-y-24">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}
