import {
  findProjectsR,
  createProjectR,
  deleteProjectByIdR,
  updateProjectR,
} from "./repository";

const getAllProjects = async (limit) => {
  const projects = await findProjectsR(limit);
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

const updateProject = async (data) => {
  const validationErrors = validateProjectData(data);
  if (validationErrors.length > 0) {
    throw {
      status: 400,
      code: 400,
      message: "Validation failed.",
      errors: validationErrors,
    };
  }
  const putProject = await updateProjectR(data);
  return putProject;
};

const deleteProjectById = async (id) => {
  const deleteProject = await deleteProjectByIdR(id);
  return deleteProject;
};

export { getAllProjects, createProject, deleteProjectById, updateProject };
