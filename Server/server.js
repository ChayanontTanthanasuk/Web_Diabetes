// ไฟล์: server.js (หรือ app.js หลัก)
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();


const cors = require("cors");


const recipeRouter = require('../Routers/recipeRouter');
const userRouter = require('../Routers/userRouter');
const catergoryRouter = require('../Routers/categoryRouter');
const newRouter = require('../Routers/newRouter')


app.use(cors({
  origin: ["https://dadkaf-18b16ds.web.app", "http://localhost:5173"], // firebase + local dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use('/api', recipeRouter);
app.use('/api', userRouter);
app.use('/api', catergoryRouter);
app.use('/api', newRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});