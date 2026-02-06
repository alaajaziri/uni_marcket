import { Link } from "react-router-dom";
import api from "../api/api";
import { auth } from "../firebase";

export default function ProductCard({ product, origin }) {
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to delete a product.");
        return;
      }
      const token = await user.getIdToken();

      await api.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: '#000' }}>
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/400x300?text=No+Image'}
          alt={product.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          className="product-img"
        />

        {/* Price Tag Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(4px)',
          color: '#fff',
          padding: '0.4rem 0.8rem',
          borderRadius: '20px',
          fontWeight: '700',
          fontSize: '0.9rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {product.price} DT
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--secondary-color)',
            fontWeight: '600'
          }}>
            {product.category || 'Item'}
          </span>
        </div>

        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', lineHeight: '1.3' }}>{product.title}</h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, lineClamp: 2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {/* Truncate description slightly if needed, or show location */}
          {product.location && `📍 ${product.location}`}
        </p>

        {/* Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
          <Link
            to={`/product/${product._id}`}
            className="btn btn-primary"
            style={{ flex: 1, fontSize: '0.9rem', padding: '0.6rem' }}
          >
            View Details
          </Link>

          {origin === "profile" && (
            <button
              className="btn btn-danger"
              style={{ padding: '0.6rem 1rem' }}
              onClick={() => deleteProduct(product._id)}
              title="Delete Listing"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
