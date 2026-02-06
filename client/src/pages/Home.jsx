import { useState, useEffect } from 'react'
import ProductsList from "./ProductsList";
import api from "../api/api";
import '../App.css'; // Ensure app styles are loaded

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);

  const [search, setSearch] = useState("");
  const [category, setCategorie] = useState("all");

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "all" || p.category === category)
  );

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h1 className="navbar-brand" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Discover Items 🏪</h1>
        <h2 style={{ color: 'var(--text-secondary)', fontWeight: '400', fontSize: '1.2rem' }}>
          Browse items for sale from students at your university
        </h2>
      </div>

      <div className="card mb-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Search for items..."
          className="form-input"
          style={{ maxWidth: '400px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          name="category"
          className='form-select'
          style={{ maxWidth: '200px' }}
          value={category}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
          <option value="tools">Tools</option>
        </select>
      </div>

      <div className="products-grid">
        <ProductsList products={filtered} />
      </div>
    </div>
  );
}