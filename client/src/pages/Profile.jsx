import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import api from "../api/api";
import ProductsList from "./ProductsList";

export default function ProfileContent() {
    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {

                window.location.href = "/login";
                return;
            }

            const token = await user.getIdToken();

            const res = await api.get(`/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    setData(res.data);

                    setLoading(false);
                })
                .catch(err => {
                    console.error("FETCH ERROR:", err);
                    setLoading(false);
                });
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {data.user.name}</p>
            <p>University: {data.user.university}</p>
            <p>Contact: {data.user.contact}</p>
            <h2>My Products</h2>
            <ProductsList products={data.products} origin="profile" />
        </div>
    );
}
