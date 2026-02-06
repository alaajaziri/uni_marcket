import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
// import "../styles/ProductDetails.css"; // Deprecated

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    api.get(`/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Note: This might be null if using firebase auth directly, but keeping logic
        },
      }
    )
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("FETCH ERROR:", err));
  }, [id]);

  if (!product._id) return (
    <div className="container text-center mt-4">
      <h2 style={{ color: 'var(--text-secondary)' }}>⏳ Loading product details...</h2>
    </div>
  );

  return (
    <div className="container">
      <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>

        {/* Image Section */}
        <div style={{ borderRadius: 'var(--border-radius)', overflow: 'hidden' }}>
          <img
            src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x400?text=No+Image'}
            alt={product.title}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Info Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {product.title}
          </h1>

          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
            {product.price} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>DT</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            {product.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1rem', marginTop: '1rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: 'var(--border-radius)' }}>
            <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Category:</span>
            <span>{product.category}</span>

            <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Location:</span>
            <span>{product.location}</span>

            <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}>Posted:</span>
            <span>{new Date(product.postedAt).toLocaleDateString()}</span>
          </div>

          {/* Seller Info */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Seller Information</h3>
            {product.seller ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>{product.seller.name}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{product.seller.university}</p>
                </div>
                <a href={`tel:${product.seller.contact}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  📞 Contact Seller
                </a>
              </div>
            ) : (
              <p>Seller info not available</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
