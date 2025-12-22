const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    seller: {
        name: String,
        university: String,
        contact: String
    }
});
module.exports = mongoose.models.User || mongoose.model("User", userSchema);