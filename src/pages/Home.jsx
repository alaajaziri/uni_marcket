import { useState } from 'react'
import { mockProducts } from "../mockProd/mockProd";
import ProductsList from "./ProductsList";
export default function Home() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const filtered = products.filter(p =>
  p.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
  <>
  <div className="header">
  <h1 className="title">Discover Items 🏪</h1>
  <h2 className="subtitle">Browse items for sale from students at your university</h2>
  <div className="search-container">
  <input type="text" placeholder="Search for items" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
  <button className="search-button">Search</button>
  </div>
  </div>
  <div >
    <ProductsList products={filtered} />
  </div>
  
  
  
  </>
);
}