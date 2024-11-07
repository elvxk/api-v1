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

const deleteProjectByIdR = async (id) => {
  const deleteProjectById = await prisma.projects.delete({ where: { id } });
  return deleteProjectById;
};

export { findProjectsR, createProjectR, deleteProjectByIdR };
