const { PrismaClient } = require('@prisma/client');
const { connect } = require('../Routers/recipeRouter');
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
    try {
        const fromData = req.body;

        if (!Array.isArray(fromData) || fromData.some(item => !item.name || typeof item.name !== "string")) {
            return res.status(400).json({ message: "Invalid category name" });
        }

        const addCateGory = await prisma.category.createMany({
            data: fromData,
            skipDuplicates: true

        });
        res.status(200).json({ message: 'addCateGory Success', data: addCateGory });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};
exports.getAllCategory = async (req, res) => {
    try {

        const getAllCateGory = await prisma.category.findMany({
            include: {
                recipes: true
            }
        });
        res.status(200).json({ message: 'addCateGory Success', data: getAllCateGory });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};
exports.getCategoryId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const getAllCateGory = await prisma.category.findUnique({
            where: { category_id: id },
            include: {
                recipes: true
            }
        });
        res.status(200).json({ message: 'addCateGory Success', data: getAllCateGory });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};
exports.updateCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const fromData = req.body;

        const updateCateGory = await prisma.category.update({
            where: { category_id: id },
            data: fromData
        });
        res.status(200).json({ message: 'UpdateCateGory Success', data: updateCateGory });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
};