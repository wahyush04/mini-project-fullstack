import { prisma } from '../prisma/client';
import { ExamsModel } from 'src/types/model/exams.type';
import { JsonObject } from '@prisma/client/runtime/library';


export const getAllExams = () => {
  return prisma.exam.findMany();
};
export const createExams = (data: Omit<ExamsModel, 'id' | 'createdAt' | 'updatedAt'>) => {
  return prisma.exam.create({
    data: {
      userId: data.userId,
      tag: data.tag,
      data: data.data as unknown as JsonObject,
    },
  });
};

export const updateStatusCourse = (id: string, data: Partial<Omit<ExamsModel, 'id'>>) => {
  return prisma.exam.update({
    where: { id },
    data: {
      ...(data.data && { data: data.data as any }),
    },
  });
};

