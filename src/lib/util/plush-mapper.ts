export const PLUSH_MAPPER: Record<string, {
  title: string;
  description: string;
  thumbnail: string;
  price_prefix?: string;
}> = {
  "prod_01KP6N2F5NB99QDRDRB2GR6GFE": {
    handle: "starter-snuggle",
    title: "The Snuggle Starter Box",
    description: "Perfect for a first-time fluffer. Every Starter Box contains one our pocket-sized companions, designed to bring magic to your desk or bedside. High-quality felt, hand-finished details. Contains 1 Mini-Plushie, stickers, and a 'Stitched with Love' badge.",
    thumbnail: "/images/starter.png",
  },
  "prod_01KP6N2F8XBKBW40TF4PWMQJXN": {
    handle: "deluxe-dreamer",
    title: "The Deluxe Dreamer Box",
    description: "The sweet spot of fluff. Our Deluxe box is a celebration of handmade art. Featuring our standard size characters with detailed embroidery and premium velvet textures. Who will you unbox tonight? Includes 1 Full-Sized Plushie, a Mini companion, and an exclusive art print.",
    thumbnail: "/images/deluxe.png",
  },
  "prod_01KP6N2FA4MD15QDFFADVK4Q8T": {
    handle: "ultimate-crate",
    title: "The Ultimate Studio Crate",
    description: "The definitive PlushYo experience. This massive crate is hand-packed with our most premium creations. Includes exclusive characters never sold separately. A true collector's treasure, stitched for a lifetime of magic. Features 2 Rare Plushies, a Jumbo fluff, and a hand-signed certificate.",
    thumbnail: "/images/ultimate.png",
  }
};

export const IS_PLUSH_PRODUCT = (id: string) => id in PLUSH_MAPPER;

export const GET_PLUSH_DATA = (id: string) => PLUSH_MAPPER[id] || null;
