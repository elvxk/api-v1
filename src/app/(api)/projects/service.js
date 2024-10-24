import { findProjects } from "./repository";

const getAllProjects = async () => {
  const projects = await findProjects();
  return projects;
};

export { getAllProjects };
