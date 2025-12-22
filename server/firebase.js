var admin = require("firebase-admin");

var serviceAccount = require("./unimarcket-3060e-firebase-adminsdk-fbsvc-2b8bfb6129.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
