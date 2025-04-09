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

function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

async function addFile(folderId, fileName, fileLink, fileSize) {
  const addFile = await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      folderFiles: {
        create: { name: fileName, link: fileLink, size: bytesToSize(fileSize) },
      },
    },
  });
}

// async function deleteEverything() {
//   const deleteFiles = prisma.file.deleteMany();
//   const deleteFolders = prisma.folder.deleteMany();
//   const deleteUsers = prisma.user.deleteMany();
//   await prisma.$transaction([deleteFiles, deleteFolders, deleteUsers]);
// }

// deleteEverything();

module.exports = {
  getUserById,
  getUserByEmail,
  signUp,
  addFolder,
  deleteFolder,
  updateFolder,
  addFile,
};
