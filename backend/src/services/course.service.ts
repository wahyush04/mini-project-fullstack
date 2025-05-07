import { prisma } from '../prisma/client';
import { JsonObject } from '@prisma/client/runtime/library';
import { CourseModel, DataCourseDTO } from '../types/model/course.type';

// Get all courses
export const getAllCourses = () => {
  return prisma.course.findMany();
};

// Get a single course by ID
export const getCourseById = (id: string) => {
  return prisma.course.findUnique({ where: { id } });
};

// Create a new course
export const createCourse = (data: Omit<CourseModel, 'id'>) => {
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
  };
  
  // Update course
  export const updateCourse = (id: string, data: Partial<Omit<CourseModel, 'id'>>) => {
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
  };

// Delete a course
export const deleteCourse = (id: string) => {
  return prisma.course.delete({ where: { id } });
};
