import prisma from "@/libs/prisma";

const findProjectsR = async (limit) => {
  const projects = await prisma.projects.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return projects;
};

const createProjectR = async (newProjectData) => {
  const newProject = await prisma.projects.create({ data: newProjectData });
  return newProject;
};

const updateProjectR = async (request) => {
  const putProject = await prisma.projects.update({
    where: {
      id: request.id,
    },
    data: {
      title: request.title,
      desc: request.desc,
      stack: request.stack,
      demo: request.demo,
      image: request.image,
    },
  });

  return putProject;
};

const deleteProjectByIdR = async (id) => {
  const deleteProjectById = await prisma.projects.delete({ where: { id } });
  return deleteProjectById;
};

export { findProjectsR, createProjectR, deleteProjectByIdR, updateProjectR };
