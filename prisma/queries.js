const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      folders: {
        include: {
          folderFiles: true,
        },
      },
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
      folders: {
        create: { name: "Default" },
      },
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

async function addFile(folderId, fileName, fileLink) {
  const addFile = await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      folderFiles: {
        create: { name: fileName, link: fileLink },
      },
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
  addFile,
};
