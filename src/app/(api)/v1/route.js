import prisma from "@/libs/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const projects = await prisma.project.findMany();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      await prisma.$disconnect(); // Disconnect Prisma Client
    }
  }
}
