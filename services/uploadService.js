const cloudinary = require("../utils/cloudinary");
const { v4: uuidv4 } = require("uuid");

async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file uploaded"));
    }

    // ใช้ path ที่ multer เก็บไฟล์ชั่วคราว
    cloudinary.uploader.upload(
      file.path,
      {
        folder: "recipes",       // โฟลเดอร์ใน Cloudinary
        public_id: uuidv4(),     // ตั้งชื่อไฟล์ไม่ให้ชนกัน
        resource_type: "image",  // ประเภทไฟล์
      },
      (err, result) => {
        if (err) return reject(err);    
        resolve(result.secure_url); // ส่ง URL กลับไป
      }
    );
  });
}

module.exports = { uploadImage };
