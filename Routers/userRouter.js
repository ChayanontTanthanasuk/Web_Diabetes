const express = require('express');
const router = express.Router();

const { creactUser, getAllUser, getUserByID, putUserByID , delUserByID } = require('../Controllers/userControllers')

// POST สร้าง user
router.post('/users', creactUser);

// GET ดึง user ทั้งหมด
router.get('/users', getAllUser);

// GET ดึง user ตาม id
router.get('/users/:id', getUserByID);

// GET อัพเดท user ตาม id
router.put('/users/update/:id', putUserByID);

// DELETE ลบ user ตาม id
router.delete('/users/delete/:id', delUserByID);



module.exports = router; 