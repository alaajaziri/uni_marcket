import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const loggedUser = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in:", loggedUser.user.uid);
            window.location.href = "/";
        } catch (err) {
            console.error("Login Error:", err);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
                setError("Invalid email or password. Please try again or create an account.");
            } else if (err.code === 'auth/wrong-password') {
                setError("Incorrect password.");
            } else {
                setError("Failed to login. " + err.message);
            }
        }
    }

    return (
        <div className="container flex-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <h1 className="text-center mb-4">Welcome Back</h1>

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

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter your email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Sign In</button>

                    <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}