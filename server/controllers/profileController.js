const Product = require("../models/product");
const User = require("../models/user");

async function getUserProducts(req, res, next) {
    console.log("getUserProducts");
    try {
        const uid = req.user.uid;

        const user = await User.findOne({ uid });
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log("user", user);
        const products = await Product.find({ userId: user._id });
        console.log("ps", products);
        res.json({
            user: {
                name: user.seller.name,
                university: user.seller.university,
                contact: user.seller.contact
            },
            products
        });

    } catch (err) {
        next(err);
    }
}

module.exports = { getUserProducts };
