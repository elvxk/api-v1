import prisma from "@/libs/prisma";

const findProjects = async () => {
  const projects = await prisma.projects.findMany();
  return projects;
};

export { findProjects };
