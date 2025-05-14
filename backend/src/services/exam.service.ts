import { prisma } from '../prisma/client';
import { ExamsModel } from 'src/types/model/exams.type';
import { JsonObject } from '@prisma/client/runtime/library';


export const getAllExams = () => {
  return prisma.exam.findMany();
};
export const createExams = (data: Omit<ExamsModel, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    return prisma.exam.create({
      data: {
        userId: data.userId,
        tag: data.tag,
        data: data.data as unknown as JsonObject,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStatusCourse = (id: string, data: Partial<Omit<ExamsModel, 'id'>>) => {
  try {
    return prisma.exam.update({
      where: { id },
      data: {
        ...(data.data && { data: data.data as any }),
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

