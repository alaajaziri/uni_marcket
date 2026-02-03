import ProductCard from "./ProductCard";
export default function ProductList({ products, origin }) {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} origin={origin} />
      ))}
    </div>
  )
}
