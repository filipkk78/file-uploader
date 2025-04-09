const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: { folders: true },
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

async function addFolder(folderName, userId) {
  const addFolder = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      folders: {
        create: { name: folderName },
      },
    },
  });
}

async function deleteFolder(folderId) {
  const deleteFolder = await prisma.folder.delete({
    where: {
      id: folderId,
    },
  });
}

async function updateFolder(folderId, newName) {
  const updateFolder = await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      name: newName,
    },
  });
}

module.exports = {
  getUserById,
  getUserByEmail,
  signUp,
  addFolder,
  deleteFolder,
  updateFolder,
};
