import { User } from '@prisma/client';
import { prisma } from '../prisma/client';


// Get all courses
export const getAllUsers = () => {
  return prisma.user.findMany();
};

// Get a single course by ID
export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUserPoint = async (id: string, points: number) => {
  return await prisma.$executeRaw`
    UPDATE users
    SET data = JSON_SET(data, '$.points', ${points})
    WHERE id = ${id}`;
};


