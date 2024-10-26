import { createProject, getAllProjects } from "./service";
import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/libs/cors";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit"); // Mendapatkan nilai 'limit' dari query

  const projects = await getAllProjects(limit ? parseInt(limit) : undefined);

  const response = NextResponse.json(
    {
      code: 200,
      status: "success",
      message: limit
        ? `Success get ${projects.length} projects (limited to ${limit})`
        : "Success get all projects",
      data: projects,
    },
    { status: 200 },
  );

  addCorsHeaders(response);
  return response;
}

export async function POST(req) {
  try {
    const newProjectData = await req.json();
    const project = await createProject(newProjectData);
    const response = NextResponse.json(
      {
        code: 201,
        status: "success",
        message: "success created project",
        data: project,
      },
      { status: 201 },
    );
    addCorsHeaders(response);
    return response;
  } catch (error) {
    if (error.status === 400) {
      // Respons kesalahan validasi
      const response = NextResponse.json(
        {
          code: 400,
          status: "error",
          message: error.message,
          errors: error.errors,
        },
        { status: 400 },
      );
      addCorsHeaders(response);
      return response;
    }

    const response = NextResponse.json(
      {
        code: 500,
        status: "error",
        message: "Internal server error.",
      },
      { status: 500 },
    );
    addCorsHeaders(response);
    return response;
  }
}
