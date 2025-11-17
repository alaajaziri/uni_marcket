export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.images} alt={product.title} style={{width:300}}/>
      <h3>{product.title}</h3>
      <p>{product.price} DT</p>
      <button>View</button>
    </div>
  );
}


