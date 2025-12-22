// middleware/authMiddleware.js
const admin = require("firebase-admin");
const User = require("../models/user");

const syncUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = await admin.auth().verifyIdToken(token);

        let user = await User.findOne({ uid: decoded.uid });

        if (!user) {
            user = await User.create({
                uid: decoded.uid,
                name: decoded.name || "",
                email: decoded.email || "",
            });
        }

        // attach user info to request
        req.user = user;
        req.uid = decoded.uid;

        next();
    } catch (err) {
        console.error("AUTH ERROR:", err);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = syncUser;
