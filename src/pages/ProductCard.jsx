import { getProductImage } from "../utils/imageUrl";

export default function ProductCard({ product }) {
  const imgUrl = getProductImage(product, { width: 300, height: 200 });
  return (
    <div className="product-card">
      <img src={imgUrl} alt={product.title} style={{ width: 300, height: 200, objectFit: "cover" }} />
      <h3>{product.title}</h3>
      <p>{product.price} DT</p>
      <button>View</button>
    </div>
  );
}


