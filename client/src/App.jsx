import { useState } from 'react'
import './App.css'
import './styles/main.css'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddListing from "./pages/AddListing";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import RouteGuard from "./components/RouteGuard";
import Login from "./pages/Login";
import ProfileContent from "./pages/Profile";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Routes >
        <Route path="/" element={
          <RouteGuard><Home /></RouteGuard>} />
        <Route path="/add" element={<RouteGuard><AddListing /></RouteGuard>} />
        <Route path="/product/:id" element={<RouteGuard><ProductDetails /></RouteGuard>} />
        <Route path="/profile" element={<RouteGuard><ProfileContent /></RouteGuard>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  )
}

export default App
