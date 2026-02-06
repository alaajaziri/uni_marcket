import { useEffect, useState } from "react";
import api from "../api/api";
import { supabase } from "../supabase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";
// import "../styles/addProdStyle.css"; // Deprecated

export default function AddListing() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronics");
  const [location, setLocation] = useState("");

  // Seller info
  const [sName, setSName] = useState("");
  const [sUni, setSUni] = useState("");
  const [sContact, setSContact] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);

      try {
        const token = await currentUser.getIdToken();
        const res = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const seller = res.data.user;
        setSName(seller.name);
        setSUni(seller.university);
        setSContact(seller.contact);
        setLoading(false);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const uploadImage = async (file) => {
    if (!file) throw new Error("No file provided");

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error, data } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  };

  async function handleAdd(e) {
    e.preventDefault();
    if (loading) return;

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const newProd = {
        title,
        price: Number(price),
        images: imageUrl ? [imageUrl] : [],
        description,
        category,
        location,
        seller: {
          name: sName,
          university: sUni,
          contact: sContact,
        },
        isSold: false,
        postedAt: new Date(),
      };

      const token = await user.getIdToken();
      await api.post('/api/products', newProd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      window.location.href = "/";
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert("Failed to add listing. See console for details.");
    }
  }

  if (loading) return <div className="text-center mt-4">Loading user profile...</div>;

  return (
    <div className="container flex-center">
      <div className="card" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="text-center mb-4">Sell an Item</h1>

        <form onSubmit={handleAdd}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="What are you selling?"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (DT)</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="furniture">Furniture</option>
              <option value="tools">Tools</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows="4"
              placeholder="Describe your item..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Campus Library"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image</label>
            <input
              type="file"
              className="form-input"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <small style={{ color: 'var(--text-secondary)' }}>Upload a clear photo of your item</small>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">Post Listing</button>
        </form>
      </div>
    </div>
  );
}