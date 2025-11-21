import { useState } from 'react'
import './App.css'
import './styles/main.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddListing from "./pages/AddListing";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <>
      <header>  
        <Navbar />
      </header>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

    </>
  )
}

export default App
