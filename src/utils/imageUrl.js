// Generates a deterministic image URL based on product data.
// Prefers existing images if provided; otherwise uses Picsum with a stable seed.

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function getProductImage(product, options = {}) {
  const width = options.width || 400;
  const height = options.height || 300;

  // If images is a non-empty string or array, return the first string
  const imgs = product?.images;
  if (typeof imgs === "string" && imgs.trim().length > 0) {
    return imgs.trim();
  }
  if (Array.isArray(imgs) && imgs.length > 0 && typeof imgs[0] === "string") {
    return imgs[0];
  }

  // Otherwise, generate a stable image from Picsum using a seed from product fields
  const seedBase = `${product?.category || "item"}-${product?.title || "product"}-${product?.id ?? "0"}`;
  const seed = slugify(seedBase);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}