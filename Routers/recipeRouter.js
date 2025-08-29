const express = require('express');
const multer = require("multer");
const router = express.Router();

// const upload = multer({ storage: multer.memoryStorage() });
const upload = multer({ dest: "uploads/" });

const { creactRecipe, getAllRecipe
    , getRecipeId, searchRecipes, updateRecipeId, createMealTime, getMealTime } = require('../Controllers/recipeControllers');


// POST method 
router.post('/recipe', upload.single("image"), creactRecipe); // done
router.post('/recipe/search', searchRecipes);

router.post('/mealtime', createMealTime);
;
// GET method 
router.get('/recipe', getAllRecipe);
router.get('/recipe/:id', getRecipeId);

router.get('/mealtime', getMealTime);


// PATCH method
router.patch('/recipe/:id',upload.single("image"), updateRecipeId); // done




module.exports = router; 