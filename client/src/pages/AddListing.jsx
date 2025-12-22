import { useState } from "react";
import api from "../api/api";
import { supabase } from "../supabase.js";
import "../styles/addProdStyle.css";

export default function AddListing() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const uploadImage = async (file) => {
    if (!file) {
      throw new Error("No file provided");
    }

    if (!file.name) {
      throw new Error("File has no name");
    }

    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  async function handleAdd(e) {

    e.preventDefault(); // prevents form reload
    try {


      const image = await uploadImage(imageFile);
      console.log("IMAGE:", image);
      const newProd = {
        title: title,
        price: price,
        images: [image],
        description: description,
        category: category,
        location: location,
        isSold: false,
        postedAt: new Date(),
      };

      api.post('/products', newProd)
        .then(res => res.data)
        .catch(err => console.error("FETCH ERROR:", err));
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
    }
  }

  return (
    <>
      <form className="add-listing-form" onSubmit={handleAdd}>
        <h1>Add a new listing</h1>

        <span style={{ fontSize: 25, color: "violet" }}>title:</span>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />

        <span style={{ fontSize: 25, color: "violet" }}>price:</span>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />

        <span style={{ fontSize: 25, color: "violet" }}>image:</span>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>description:</span>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>category:</span>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <br />
        <span style={{ fontSize: 25, color: "violet" }}>location:</span>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br />
        <button type="submit">Add Listing</button>
      </form>
    </>
  );
}