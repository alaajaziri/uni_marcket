import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link style={{ color: "#ffffffff", backgroundColor: "#cc00ff80", borderRadius: "5px", padding: "0.5rem 1rem" }} to="/">Home</Link>
      <Link style={{ color: "#ffffffff", backgroundColor: "#cc00ff80", borderRadius: "5px", padding: "0.5rem 1rem" }} to="/add">Add Listing</Link>
      <Link style={{ color: "#ffffffff", backgroundColor: "#cc00ff80", borderRadius: "5px", padding: "0.5rem 1rem" }} to="/signup">Signup</Link>
      <Link style={{ color: "#ffffffff", backgroundColor: "#cc00ff80", borderRadius: "5px", padding: "0.5rem 1rem" }} to="/login">Login</Link>
    </nav>
  );
}