import { useState, useEffect } from 'react'
import ProductsList from "./ProductsList";
import api from "../api/api";
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
    <>
      <div className="header">
        <h1 className="title">Discover Items 🏪</h1>
        <h2 className="subtitle">Browse items for sale from students at your university</h2>
        <div className="search-container">
          <input type="text" placeholder="Search for items" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select name="category" className='category' value={category} onChange={(e) => setCategorie(e.target.value)}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="furniture">Furniture</option>
            <option value="tools">Tools</option>
          </select>
        </div>
      </div>
      <div >
        <ProductsList products={filtered} />
      </div>



    </>
  );
}