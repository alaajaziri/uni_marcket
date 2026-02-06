import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import api from "../api/api";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState("");

    async function handleSignup(e) {
        e.preventDefault();
        setError("");

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created:", user.user.uid);

            await api.post("/users", {
                uid: user.user.uid,
                seller: {
                    name,
                    university,
                    contact
                }
            });

            window.location.href = "/";
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.message);
        }
    }

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
                <h1 className="text-center mb-4">Create Account</h1>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" placeholder="John Doe" required onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" placeholder="john@university.edu" required onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" placeholder="******" required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">University</label>
                        <input type="text" className="form-input" placeholder="University Name" required onChange={(e) => setUniversity(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contact Number</label>
                        <input type="text" className="form-input" placeholder="+216 ..." required onChange={(e) => setContact(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>

                    <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}