const express = require('express');
const router = express.Router();

const { createCategory, getAllCategory
    , getCategoryId, updateCategory } = require('../Controllers/categoryControllers');

// POST method 
router.post('/category', createCategory);


// GET method 
router.get('/category', getAllCategory);
router.get('/category/:id', getCategoryId);


// PATCH method
router.patch('/category/:id', updateCategory);





module.exports = router; 