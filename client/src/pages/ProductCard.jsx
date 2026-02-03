import { Link } from "react-router-dom";
import api from "../api/api";
import { auth } from "../firebase";

export default function ProductCard({ product, origin }) {
  const deleteProduct = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        alert("You must be logged in to delete a product.");
        return;
      }

      const token = await user.getIdToken();

      api.delete(`/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };
  return (
    <div className="product-card">
      <img src={product.images} alt={product.title} style={{ width: 300 }} />
      <h3>{product.title}</h3>
      <p>{product.price} DT</p>
      <Link style={{ color: "#ffffffff", fontWeight: "bold", backgroundColor: "#cc00ff80", borderRadius: "5px", padding: "0.5rem 1rem" }} to={`/product/${product._id}`}>Details</Link>
      {origin === "profile" && (
        <button style={{ color: "#ffffffff", fontWeight: "bold", fontSize: "1rem", backgroundColor: "#cc00ff80", borderRadius: "5px", padding: "0.6rem 1.2rem ", marginLeft: "1rem", border: "none", cursor: "pointer" }} onClick={() => deleteProduct(product._id)}>Delete</button>
      )}

    </div>
  );
}
