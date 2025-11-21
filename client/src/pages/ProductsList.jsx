import ProductCard from "./ProductCard";
export default function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )
}
