import { prisma } from '../prisma/client';


// Get all courses
export const getAllUsers = () => {
  return prisma.user.findMany();
};

// Get a single course by ID
export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

