import prisma from "@/libs/prisma";

const findProjectsR = async () => {
  const projects = await prisma.projects.findMany();
  return projects;
};

const createProjectR = async (newProjectData) => {
  const newProject = await prisma.projects.create({ data: newProjectData });
  return newProject;
};

export { findProjectsR, createProjectR };
