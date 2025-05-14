import { prisma } from '../prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { CourseModel, DataCourseDTO } from '../types/model/course.type';

// Get all courses
export const getAllCourses = () => {
  return prisma.course.findMany();
};

// Get a single course by ID
export const getCourseById = async (id: string) => {
  try {
    return await prisma.course.findUnique({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new course
export const createCourse = (data: Omit<CourseModel, 'id'>) => {
    try {
      return prisma.course.create({
        data: {
          code: data.code,
          title: data.title,
          order: data.order,
          tag: data.tag,
          description: data.description,
          data: data.data as unknown as JsonObject,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Update course
  export const updateCourse = (id: string, data: Partial<Omit<CourseModel, 'id'>>) => {
    try {
      return prisma.course.update({
        where: { id },
        data: {
          ...(data.code && { code: data.code }),
          ...(data.title && { title: data.title }),
          ...(data.order && { order: data.order }),
          ...(data.tag && { tag: data.tag }),
          ...(data.description && { description: data.description }),
          ...(data.data && { data: data.data as any }),
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const deleteCourse = (id: string) => {
  try {
    return prisma.course.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
