import { User } from '@prisma/client';
import { prisma } from '../prisma/client';


// Get all courses
export const getAllUsers = () => {
  try {
    return prisma.user.findMany();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get a single course by ID
export const getUserById = (id: string) => {
  try {
    return prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserPoint = async (id: string, points: number) => {
  try {
    await prisma.$executeRaw`
      UPDATE users
      SET data = JSON_SET(data, '$.points', ${points})
      WHERE id = ${id}`;
  } catch (error) {
    console.error('Error updating user points:', error);
    throw error;
  }
};


