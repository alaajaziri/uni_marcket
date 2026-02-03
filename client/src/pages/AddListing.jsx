import { useEffect, useState } from "react";
import api from "../api/api";
import { supabase } from "../supabase.js";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/addProdStyle.css";
import { getAuth } from "firebase/auth";
export default function AddListing() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [sName, setSName] = useState("");
  const [sUni, setSUni] = useState("");
  const [sContact, setSContact] = useState("");
  const [data, setData] = useState(null);

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const seller = res.data.user;
        console.log(seller);
        setSName(seller.name);
        setSUni(seller.university);
        setSContact(seller.contact);

        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
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
        seller: {
          name: sName,
          university: sUni,
          contact: sContact,
        },
        isSold: false,
        postedAt: new Date(),
      };
      const token = await user.getIdToken();

      await api.post(
        '/api/products',
        newProd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(res => res.data)
        .catch(err => console.error("FETCH ERROR:", err));
      window.location.href = "/";
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