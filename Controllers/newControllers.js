const { PrismaClient } = require('@prisma/client');
const { connect } = require('../Routers/newRouter');
const { uploadImage } = require("../services/uploadService");
const prisma = new PrismaClient();


exports.creactNew = async (req, res) => {
    try {
        const fromData = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = await uploadImage(req.file);
        }

        const addNew = await prisma.news.create({
            data: {
                title: fromData.title,
                content: fromData.content,
                image_url: imageUrl
            }
        });

        res.status(200).json({ message: "creactNew Success", data: addNew });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
};

exports.getAllNews = async (req, res) => {
    try {

        const getAllNews = await prisma.news.findMany();

        res.status(200).json({ message: "getAllNew Success", data: getAllNews });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {

        const id = parseInt(req.params.id);
        const getNewsById = await prisma.news.findUnique({
            where: { new_id: id }
        });

        res.status(200).json({ message: "getNewId Success", data: getNewsById });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
};
