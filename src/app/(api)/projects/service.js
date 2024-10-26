import { findProjectsR, createProjectR } from "./repository";

const getAllProjects = async () => {
  const projects = await findProjectsR();
  return projects;
};

const validateProjectData = (data) => {
  const errors = [];

  if (!data.title) {
    errors.push({ field: "title", message: "Title is required." });
  }
  if (!data.desc) {
    errors.push({ field: "desc", message: "Description is required." });
  }
  if (!data.stack) {
    errors.push({ field: "stack", message: "Stack is required." });
  }
  if (!data.demo) {
    errors.push({ field: "demo", message: "Demo link is required." });
  }
  if (!data.image) {
    errors.push({ field: "image", message: "Image link is required." });
  }

  return errors;
};

const createProject = async (data) => {
  const validationErrors = validateProjectData(data);

  if (validationErrors.length > 0) {
    throw {
      status: 400,
      code: 400,
      message: "Validation failed.",
      errors: validationErrors,
    };
  }
  const newProject = await createProjectR(data);
  return newProject;
};

export { getAllProjects, createProject };
