import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { GET_PLUSH_DATA } from "@lib/util/plush-mapper"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const plushData = GET_PLUSH_DATA(product.id!)
  const displayTitle = plushData ? plushData.title : product.title
  const displayThumbnail = plushData ? plushData.thumbnail : product.thumbnail

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div 
        data-testid="product-wrapper"
        className="relative bg-surface p-4 rounded-[2rem] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] group"
      >
        <div className="relative overflow-hidden rounded-[1.5rem] stitch-border toy-wobble">
          <Thumbnail
            thumbnail={displayThumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
          {isFeatured && (
            <div className="absolute top-4 left-4 bg-secondary-container/80 backdrop-blur-md text-secondary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-10 border border-secondary/20">
              Studio Pick
            </div>
          )}
        </div>
        
        <div className="flex flex-col mt-6 gap-y-2 px-2">
          <Text className="text-primary font-bold text-2xl leading-tight puffy-text lowercase tracking-tight" data-testid="product-title">
            {displayTitle}
          </Text>
          <div className="flex items-center justify-between">
            <span className="text-primary/40 text-xs italic font-medium">✨ Magic Inside</span>
            {cheapestPrice && (
              <div className="bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <PreviewPrice price={cheapestPrice} />
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
