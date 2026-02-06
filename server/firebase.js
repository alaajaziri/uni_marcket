var admin = require("firebase-admin");

var serviceAccount = require("./unimarcket-3060e-firebase-adminsdk-fbsvc-0e33e76925.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
