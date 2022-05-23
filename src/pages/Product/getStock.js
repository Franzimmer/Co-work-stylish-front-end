function getStock(variants, colorCode, size) {
  return variants.find(
    (variant) => variant.color_code === colorCode && variant.size === size
  ).stock;
}

export default getStock;
