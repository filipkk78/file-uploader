const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

async function getUserByEmail(userEmail) {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  return user;
}

async function signUp(userName, userEmail, userPwd) {
  const signUp = await prisma.user.create({
    data: {
      email: userEmail,
      name: userName,
      password: userPwd,
    },
  });
}

module.exports = {
  getUserById,
  getUserByEmail,
  signUp,
};
