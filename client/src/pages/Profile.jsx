import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import api from "../api/api";
import ProductsList from "./ProductsList";
import { Link } from "react-router-dom";

export default function ProfileContent() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                window.location.href = "/login";
                return;
            }
            setUser(currentUser);

            try {
                const token = await currentUser.getIdToken();
                const res = await api.get(`/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(res.data);
            } catch (err) {
                console.error("FETCH ERROR:", err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        window.location.href = "/login";
    };

    if (loading) return (
        <div className="container text-center mt-4">
            <h2 style={{ color: 'var(--text-secondary)' }}>⏳ Loading profile...</h2>
        </div>
    );

    if (!data) return (
        <div className="container text-center mt-4">
            <h2 style={{ color: 'var(--text-secondary)' }}>Profile not found.</h2>
        </div>
    );

    return (
        <div className="container">
            {/* Profile Header Card */}
            <div className="card mb-4" style={{
                background: 'linear-gradient(135deg, var(--surface-color) 0%, rgba(30, 41, 59, 0.8) 100%)',
                borderColor: 'var(--primary-color)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ marginBottom: '0.5rem' }}>👋 Hello, {data.user.name || 'Student'}</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your listings and account details</p>
                    </div>
                    <button onClick={handleLogout} className="btn btn-secondary" style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                        Sign Out
                    </button>
                </div>

                <div style={{
                    marginTop: '2rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                }}>
                    <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>University</label>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>🎓 {data.user.university}</p>
                    </div>

                    <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</label>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>📞 {data.user.contact}</p>
                    </div>

                    <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px' }}>
                        <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                        <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>✉️ {user?.email}</p>
                    </div>
                </div>
            </div>

            {/* My Listings Section */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2>📦 My Listings</h2>
                    <Link to="/add" className="btn btn-primary">+ Add New Item</Link>
                </div>

                {data.products && data.products.length > 0 ? (
                    <ProductsList products={data.products} origin="profile" />
                ) : (
                    <div className="text-center" style={{ padding: '4rem', background: 'var(--surface-color)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                        <h3 style={{ color: 'var(--text-secondary)' }}>You haven't posted any items yet.</h3>
                        <Link to="/add" className="btn btn-primary mt-4">Start Selling</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
