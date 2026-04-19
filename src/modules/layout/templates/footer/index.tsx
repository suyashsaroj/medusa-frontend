import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-primary/5 rounded-t-[3rem] mt-20 border-t border-primary/10 w-full pt-16">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-20 border-b border-primary/10">
          <div>
            <LocalizedClientLink
              href="/"
              className="text-2xl font-black text-primary font-headline tracking-tighter"
            >
              PlushYo Studio
            </LocalizedClientLink>
            <p className="mt-4 text-ui-fg-subtle italic max-w-xs">
              Hand-stitched memories, premium fabrics, and a dash of magic in every fluff.
            </p>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            <div className="flex flex-col gap-y-2">
              <span className="font-bold text-primary uppercase tracking-widest text-xs">
                The Boxes
              </span>
              <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle">
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/products/starter-snuggle">
                    Snuggle Starter
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/products/deluxe-dreamer">
                    Deluxe Dreamer
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/products/ultimate-crate">
                    Ultimate Studio Crate
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold text-primary uppercase tracking-widest text-xs">
                Collection
              </span>
              <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle">
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/collections/featured">
                    Studio Picks
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/collections/mystery">
                    The Mystery Series
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/collections/limited">
                    Limited Fluffs
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="font-bold text-primary uppercase tracking-widest text-xs">Studio</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle">
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/store">
                    The Studio Shop
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/tracking">
                    Track Your Magic
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink className="hover:text-primary transition-colors" href="/account">
                    Studio Account
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center py-12 gap-6">
          <div className="text-3xl font-headline italic text-primary/80">
            Handmade with Love © {new Date().getFullYear()}
          </div>
          
          <div className="w-full h-1 border-t-4 border-dashed border-primary/5"></div>

          <div className="flex w-full justify-between items-center text-ui-fg-muted text-xs mt-8">
            <Text className="txt-compact-small">
              PlushYo Studio - Premium Handmade Wonders.
            </Text>
            <MedusaCTA />
          </div>
        </div>
      </div>
    </footer>
  )
}
