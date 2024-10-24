import { getAllProjects } from "./service";
import { NextResponse } from "next/server";

export async function GET(request) {
  const projects = await getAllProjects();
  return NextResponse.json({ status: 200, message: "success", data: projects });
}
