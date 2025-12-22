const Product = require("../models/product");
const User = require("../models/user");

async function getUserProducts(req, res, next) {
    console.log("getUserProducts");
    try {
        const uid = req.user.uid;

        const user = await User.findOne({ uid });
        if (!user) return res.status(404).json({ message: "User not found" });

        const products = await Product.find({ sellerUid: uid });
        console.log("ps", products);
        res.json({
            user: {
                name: user.name,
                university: user.university,
                contact: user.contact
            },
            products
        });

    } catch (err) {
        next(err);
    }
}

module.exports = { getUserProducts };
