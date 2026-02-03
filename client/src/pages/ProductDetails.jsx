import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import api from "../api/api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});


  useEffect(() => {
    api.get(`/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("FETCH ERROR:", err));
  }, [id]);

  if (!product._id) return <p className="loading-text">⏳ Loading product...</p>;

  return (
    <div className="product-container">
      <h1 className="product-title">{product.title}</h1>

      <img src={product.images[0]} alt={product.title} className="product-image" />

      <div className="product-info">
        <p><span className="info-label">📝 Description:</span> {product.description}</p>
        <p><span className="info-label">💰 Price:</span> {product.price} DT</p>
        <p><span className="info-label">📁 Category:</span> {product.category}</p>
        <p><span className="info-label">📍 Location:</span> {product.location}</p>
        <p><span className="info-label">⭐ Rating:</span> {product.rating}</p>
        <p><span className="info-label">📅 Posted At:</span> {product.postedAt}</p>
      </div>

      <div className="seller-section">
        <h2 className="seller-title">👤 Seller Info</h2>
        {product.seller ? (
          <>
            <p><span className="info-label">👤 Name:</span> {product.seller.name}</p>
            <p><span className="info-label">🎓 University:</span> {product.seller.university}</p>
            <p><span className="info-label">📞 Contact:</span> {product.seller.contact}</p>

            <a href={`tel:${product.seller.contact}`} className="contact-btn">📩 Call Seller</a>
          </>
        ) : (
          <p>Seller info not available</p>
        )}
      </div>
    </div>
  );
}
