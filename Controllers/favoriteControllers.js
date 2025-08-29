const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

// creact category
exports.creactCategory = async (req, res) => {
  try {
    const fromData = req.body;

    const addcategory = await prisma.category.create({
      data: {
        name: fromData.name,
        description: fromData.description,
        imgeUrl: fromData.imgeUrl
      }
    });

    res.status(200).json({ message: 'addCategory Success', data: addcategory });
  } catch (err) {
    res.status(500).json({ message: 'err:', err });
  }
};

// get all category
exports.getAllCategory = async (req, res) => {
  try {
    const getallcategory = await prisma.category.findMany()
    if (!getallcategory || getallcategory.length === 0) {
      return res.status(404).json({ message: 'ไม่พบหมวดหมู่ใดๆ' });
    }
    res.status(200).json({ message: 'getAllProduct Success', data: getallcategory })

  } catch (err) {
    res.status(500).json({ message: 'err:', err })
  }
}
// get category by id
exports.getCategory = async (req, res) => {
  try {
    const id = parseInt(req.category.id)
  } catch (err) {
    res.status(500).json({ message: 'err:', err })
  }
}
// put category
exports.updateCategory = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'err:', err })
  }
}
// delete all category
exports.deleteAllCategory = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'err:', err })
  }
}
// delete category by id
exports.deleteCategoryById = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json({ message: 'err:', err })
  }
}
