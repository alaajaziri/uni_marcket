const User = require("../models/user");

const adduser = async (req, res, next) => {
    const { uid, seller } = req.body;
    try {
        const user = await User.create({ uid, seller });
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}
module.exports = { adduser };