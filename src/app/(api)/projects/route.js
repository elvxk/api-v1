import { getAllProjects } from "./service";
import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/libs/cors";

export async function POST(req) {
  const projects = await getAllProjects();

  const response = NextResponse.json({
    status: 200,
    message: "success",
    data: projects,
  });

  addCorsHeaders(response);
  return response;
}
