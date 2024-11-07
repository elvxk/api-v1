import {
  createProject,
  deleteProjectById,
  getAllProjects,
  updateProject,
} from "./service";
import { NextResponse } from "next/server";

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
    return response;
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json(); // Mengambil 'id' dari body request

    if (!id) {
      // Jika 'id' tidak ada, kirim respons error
      const response = NextResponse.json(
        {
          code: 400,
          status: "error",
          message: "ID is required to delete a project.",
        },
        { status: 400 },
      );
      return response;
    }

    const deleteResult = await deleteProjectById(id);

    if (!deleteResult) {
      // Jika proyek tidak ditemukan, kirim respons error
      const response = NextResponse.json(
        {
          code: 404,
          status: "error",
          message: `Project with ID ${id} not found.`,
        },
        { status: 404 },
      );
      return response;
    }

    // Jika berhasil, kirim respons sukses
    const response = NextResponse.json(
      {
        code: 200,
        status: "success",
        message: `Project with ID ${id} has been deleted.`,
      },
      { status: 200 },
    );
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        code: 500,
        status: "error",
        message: "Internal server error.",
      },
      { status: 500 },
    );
    return response;
  }
}

export async function PUT(req) {
  try {
    const newProjectData = await req.json();
    const project = await updateProject(newProjectData);
    const response = NextResponse.json(
      {
        code: 200,
        status: "success",
        message: "success updated project",
        data: project,
      },
      { status: 200 },
    );
    return response;
  } catch (error) {
    console.log(error);
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
      return response;
    }
    if (error.code === "P2023") {
      // Kode kesalahan Prisma untuk entitas tidak ditemukan
      const response = NextResponse.json(
        {
          code: 404,
          status: "error",
          message: "No project found for the provided ID.",
        },
        { status: 404 },
      );
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
    return response;
  }
}
