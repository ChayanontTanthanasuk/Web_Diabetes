const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");

const serviceAccount = require("../Config/firebaseServiceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "dadkaf-18b16ds.appspot.com", // เปลี่ยนตาม Firebase project
});

const bucket = admin.storage().bucket();

module.exports = { bucket, uuidv4 };
