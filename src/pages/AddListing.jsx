import { useState } from "react";
import { mockProducts } from "../mockProd/mockProd";

export default function AddListing() {
  const [id, setId] = useState(21);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageUrl] = useState("");

  function handleAdd(e) {
    e.preventDefault(); // prevents form reload

    const newProd = {
      id: id,
      title: title,
      price: price,
      images: [imageURL],
    };

    mockProducts.push(newProd);
    setId(prev => prev + 1);

    // optional: clear inputs
    setTitle("");
    setPrice(0);
    setImageUrl("");
  }

  return (
    <>
      <form onSubmit={handleAdd}>
        <h1>Add a new listing</h1>

        <span style={{ fontSize: 25, color: "violet" }}>title:</span>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <br/>

        <span style={{ fontSize: 25, color: "violet" }}>price:</span>
        <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
        <br/>

        <span style={{ fontSize: 25, color: "violet" }}>imageURL:</span>
        <input type="text" value={imageURL} onChange={(e)=>setImageUrl(e.target.value)} />
        <br/>

        <button type="submit">Add Listing</button>
      </form>
    </>
  );
}