const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// creact category
exports.creactUser = async (req, res) => {
  try {
    const fromData = req.body;

    const addUser = await prisma.user.create({
      data: {
        name: fromData.name,
        email: fromData.email,
        password: fromData.password,
      }
    });
    res.status(200).json({ message: 'addUser Success', data: addUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack
    });
  }
};
// get user
exports.getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        recipes: true,
        favorites: true,
      },
    });

    res.status(200).json({ message: 'getAllUser Success', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack,
    });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userid = await prisma.user.findUnique({
      where: { user_id: id },
      include: {
        recipes: true,
        favorites: true,
      },
    });
    if (!userid) {
      return res.status(404).json({ message: `User with id ${id} not found` })
    }
    res.status(200).json({ message: 'getUserID Success', data: userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack,
    });
  }
};
// put users

exports.putUserByID = async (req, res) => {
  try {
    const fromData = req.body;
    const id = parseInt(req.params.id);

    const existingUser = await prisma.user.findFirst({
      where: { user_id: id }
    });
    if (!existingUser) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }
    // เช็ค Name
    const duplicateName = await prisma.user.findFirst({
      where: {
        name: fromData.name,
        NOT: { user_id: id }
      }
    });
    if (duplicateName) {
      return res.status(400).json({ message: 'Name already exists' });
    }
    // เช็ค Email
    const duplicateEmail = await prisma.user.findFirst({
      where: {
        email: fromData.email,
        NOT: { user_id: id }
      }
    });
    if (duplicateEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const updatedUser = await prisma.user.update({
      where: { user_id: id },
      data: {
        name: fromData.name,
        email: fromData.email,
        password: fromData.password,
        role: fromData.role
      },
    });
    res.status(200).json({ message: 'Put User Success', data: updatedUser });
  } catch (err) {

    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack,
    });
  }
};
// delete UserId
exports.delUserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userid = await prisma.user.delete({
      where: { user_id: id }
    });
    res.status(200).json({ message: 'delUserID Success', data: userid });
  } catch (err) {
    if (err.code === 'P2025') {
      // Prisma error: record not found
      return res.status(404).json({ message: `User with id ${req.params.id} not found` });
    }
    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack,
    });
  }
};




