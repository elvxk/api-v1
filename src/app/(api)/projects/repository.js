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

export { findProjectsR, createProjectR };
