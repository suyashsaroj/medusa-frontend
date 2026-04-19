import { Heading, Text } from "@medusajs/ui"

const BrandStory = () => {
  return (
    <div className="content-container py-24">
      <div className="relative bg-surface-container rounded-[3rem] p-12 md:p-24 overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] felt-texture">
        {/* Decorative corner stitch */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-8 border-t-8 border-dashed border-primary/10 rounded-tl-[3rem] -translate-x-4 -translate-y-4"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-8 border-b-8 border-dashed border-primary/10 rounded-br-[3rem] translate-x-4 translate-y-4"></div>

        <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container rounded-full text-secondary font-bold text-sm tracking-widest uppercase">
            <span className="material-symbols-outlined text-lg">auto_stories</span>
            The PlushYo Origin
          </div>

          <Text className="text-xl md:text-3xl text-primary/80 leading-relaxed font-bold italic tracking-tight px-4">
            "Born in a small studio where threads tell stories and fluff brings dreams to life. At PlushYo, we believe every object deserves a soul—and a soft protective layer."
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-primary shadow-inner">
                <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
              </div>
              <Heading level="h3" className="text-lg font-bold text-primary">Hand-Finished</Heading>
              <Text className="text-sm text-primary/60">Every stitch is inspected by our master fluff-engineers.</Text>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary shadow-inner">
                <span className="material-symbols-outlined text-3xl">eco</span>
              </div>
              <Heading level="h3" className="text-lg font-bold text-primary">Cloud Material</Heading>
              <Text className="text-sm text-primary/60">We use ultra-soft, hypoallergenic fibers for maximum snuggle.</Text>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-tertiary shadow-inner">
                <span className="material-symbols-outlined text-3xl">magic_button</span>
              </div>
              <Heading level="h3" className="text-lg font-bold text-primary">Puffy Tech</Heading>
              <Text className="text-sm text-primary/60">Unmatched drop protection for your gear, wrapped in softness.</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandStory
