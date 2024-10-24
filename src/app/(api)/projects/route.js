import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const projects = await prisma.Projects.findMany();
  return NextResponse.json({ status: 200, message: "success", data: projects });
}
