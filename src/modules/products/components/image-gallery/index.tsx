import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { GET_PLUSH_DATA } from "@lib/util/plush-mapper"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  productId?: string
}

const ImageGallery = ({ images, productId }: ImageGalleryProps) => {
  const plushData = productId ? GET_PLUSH_DATA(productId) : null
  
  // If we have plush data, we use our custom thumbnail as the main image
  const displayImages = plushData 
    ? [{ id: "plush-thumb", url: plushData.thumbnail }, ...images]
    : images

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-12">
        {displayImages.map((image, index) => {
          return (
            <div key={image.id} className="toy-wobble">
              <Container
                className="relative aspect-[11/14] w-full overflow-hidden bg-surface-container/50 border-4 border-white shadow-xl rounded-[2rem] stitch-border"
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index === 0}
                    className="absolute inset-0"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 800px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </Container>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
