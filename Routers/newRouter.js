const express = require('express');
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

const { creactNew , getAllNews , getNewsById } = require('../Controllers/newControllers');


// POST method 
router.post('/news', upload.single("image"),creactNew ); // done

router.get('/news' , getAllNews ); // done
router.get('/news/:id' , getNewsById ); // done



module.exports = router; 