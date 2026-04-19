import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-24 mx-auto border-b-4 border-dashed duration-200 bg-surface/90 backdrop-blur-xl border-primary/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] felt-texture">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex items-center">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="text-4xl font-black text-primary bg-primary-container px-8 py-2 rounded-[2rem] border-4 border-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] font-headline tracking-tighter toy-wobble"
              data-testid="nav-store-link"
            >
              PlushYo
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-4 h-full">
              <LocalizedClientLink
                className="bg-secondary-container/50 text-secondary border border-secondary/10 px-6 py-2 rounded-full font-bold hover:bg-secondary hover:text-white transition-all duration-300"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <div className="bg-primary/5 px-6 py-2 rounded-full border border-primary/10 text-primary font-bold">
                  Cart (0)
                </div>
              }
            >
              <div className="bg-primary text-white px-6 py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-200">
                <CartButton />
              </div>
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
