import { useState } from "react";
import api from "../api/api";

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageURL, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerUniversity, setSellerUniversity] = useState("");
  const [sellerContact, setSellerContact] = useState("");

  function handleAdd(e) {
    e.preventDefault(); // prevents form reload

    const newProd = {
      title: title,
      price: price,
      images: [imageURL],
      description: description,
      category: category,
      condition: condition,
      quantity: quantity,
      isSold: false,
      seller: {
        name: sellerName,
        university: sellerUniversity,
        contact: sellerContact,
      },
      location: location,
      tags: tags.split(','),
      rating: 0,
      postedAt: new Date(),
    };
    api.post('/products', newProd)
      .then(res => res.data)
      .catch(err => console.error("FETCH ERROR:", err));
  }

  return (
    <>
      <form onSubmit={handleAdd}>
        <h1>Add a new listing</h1>

        <span style={{ fontSize: 25, color: "violet" }}>title:</span>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />

        <span style={{ fontSize: 25, color: "violet" }}>price:</span>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />

        <span style={{ fontSize: 25, color: "violet" }}>imageURL:</span>
        <input type="text" value={imageURL} onChange={(e) => setImageUrl(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>description:</span>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>category:</span>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>condition:</span>
        <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>quantity:</span>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>location:</span>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>tags:</span>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>sellerName:</span>
        <input type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>sellerUniversity:</span>
        <input type="text" value={sellerUniversity} onChange={(e) => setSellerUniversity(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>sellerContact:</span>
        <input type="text" value={sellerContact} onChange={(e) => setSellerContact(e.target.value)} />
        <br />

        <button type="submit">Add Listing</button>
      </form>
    </>
  );
}