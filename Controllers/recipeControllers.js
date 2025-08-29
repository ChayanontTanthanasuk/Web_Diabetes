const { PrismaClient } = require('@prisma/client');
const { connect } = require('../Routers/recipeRouter');
const { uploadImage } = require("../services/uploadService");
const prisma = new PrismaClient();

// Recipe ......................................................
exports.creactRecipe = async (req, res) => {
    try {
        const fromData = req.body;
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadImage(req.file);
        }

        // parse mealTimeIDs
        let mealTimeIDs = [];
        if (fromData.mealTimeIDs) {
            mealTimeIDs = typeof fromData.mealTimeIDs === "string"
                ? JSON.parse(fromData.mealTimeIDs) // "[1,2]" => [1,2]
                : fromData.mealTimeIDs;
        }

        const addRecipe = await prisma.recipe.create({
            data: {
                title: fromData.title,
                description: fromData.description,
                instructions: fromData.instructions,
                image_url: imageUrl,
                category_id: parseInt(fromData.category_id),
                created_by: parseInt(fromData.created_by),
                mealTimes: {
                    connect: mealTimeIDs.map(id => ({ id: Number(id) }))
                }
            },
        });

        res.status(200).json({ message: "creactRecipe Success", data: addRecipe });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
};

exports.getAllRecipe = async (req, res) => {
    try {
        const getallRecipe = await prisma.recipe.findMany({
            include: {
                author: true
            }
        });
        res.status(200).json({ message: 'getAllRecipe Success', data: getallRecipe });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};

exports.getRecipeId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const getRecipeId = await prisma.recipe.findUnique({
            where: { recipe_id: id }
        });
        res.status(200).json({ message: 'getRecipeId Success', data: getRecipeId });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};

exports.updateRecipeId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const fromData = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = await uploadImage(req.file);
        }

        // 🟢 parse mealTimeIDs ให้เป็น array เสมอ
        let mealTimeIDs = [];
        if (fromData.mealTimeIDs) {
            mealTimeIDs =
                typeof fromData.mealTimeIDs === "string"
                    ? JSON.parse(fromData.mealTimeIDs) // "[1,2]" => [1,2]
                    : fromData.mealTimeIDs;
        }

        const updateRecipeId = await prisma.recipe.update({
            where: { recipe_id: id },
            data: {
                title: fromData.title,
                description: fromData.description,
                image_url: imageUrl,
                mealTimes: {
                    set: mealTimeIDs.map(mtId => ({ id: Number(mtId) })) // ✅ ใช้ตัวที่ parse แล้ว
                },
                category: {
                    connect: { category_id: Number(fromData.category_id) }
                },
                author: {
                    connect: { user_id: Number(fromData.created_by) }
                }
            },
            include: {
                mealTimes: true
            }
        });

        res
            .status(200)
            .json({ message: "updateRecipeId Success", data: updateRecipeId });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "err:",
            error: err.message,
            stack: err.stack
        });
    }
};


exports.searchRecipes = async (req, res) => {
    try {
        const keyword = req.body?.keyword || ""; // ถ้า body ไม่มีจะเป็น string ว่าง

        if (!keyword) {
            return res.status(400).json({ message: "Please provide a search keyword" });
        }

        const searchRecipe = await prisma.recipe.findMany({
            where: {
                title: {
                    contains: keyword,
                    mode: 'insensitive'
                }
            }
        });
        res.status(200).json({ message: 'Search results', data: searchRecipe });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};

exports.createMealTime = async (req, res) => {
    try {
        const fromData = req.body

        const createmealtime = await prisma.mealTime.create({
            data: {
                name: fromData.name
            }
        });
        res.status(200).json({ message: 'createMealTime success', data: createmealtime });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};

exports.getMealTime = async (req, res) => {
    try {
        const meal = await prisma.mealTime.findFirst({
            where: { name: "Lunch" },
            include: {
                recipes: {
                    select: {
                        title: true,
                        image_url: true
                    },
                },
            },
        });
        res.status(200).json({ message: 'createMealTime success', data: meal });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};