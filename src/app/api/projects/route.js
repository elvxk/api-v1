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
  // Mengambil dan memeriksa body request
  let request;
  try {
    request = await req.json();
  } catch (error) {
    const response = NextResponse.json(
      {
        code: 400,
        status: "error",
        message: "Request body is missing or invalid.",
      },
      { status: 400 },
    );
    return response;
  }

  // Memeriksa apakah ID ada dalam body
  if (!request.id) {
    const response = NextResponse.json(
      {
        code: 400,
        status: "error",
        message: "ID is required in the request body.",
      },
      { status: 400 },
    );
    return response;
  }

  // Mencoba memperbarui data berdasarkan ID
  try {
    const updatedLink = await updateProject(request);

    // Menyiapkan respons sukses
    const response = NextResponse.json(
      {
        code: 200,
        status: "success",
        message: "Link updated successfully.",
        data: updatedLink,
      },
      { status: 200 },
    );

    return response;
  } catch (error) {
    // Menangani kesalahan jika data tidak ditemukan
    if (error.code === "P2025") {
      // Kode kesalahan Prisma untuk entitas tidak ditemukan
      const response = NextResponse.json(
        {
          code: 404,
          status: "error",
          message: "No link found for the provided ID.",
        },
        { status: 404 },
      );
      return response;
    }

    console.error("Error updating link:", error);
    const response = NextResponse.json(
      {
        code: 500,
        status: "error",
        message: "Internal Server Error",
      },
      { status: 500 },
    );
    return response;
  }
}
