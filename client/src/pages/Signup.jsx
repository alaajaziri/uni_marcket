import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import api from "../api/api";
import { useState } from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [contact, setContact] = useState("");
    async function handleSignup(e) {
        e.preventDefault();

        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user.user.uid);
        api.post("/users", {
            uid: user.user.uid,
            seller: {
                name,
                university,
                contact
            }
        });
        window.location.href = "/";
    }
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Name" name="name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="University" name="university" onChange={(e) => setUniversity(e.target.value)} />
                <input type="text" placeholder="Contact" name="contact" onChange={(e) => setContact(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}