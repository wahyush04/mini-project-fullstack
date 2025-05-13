import { createApiStore } from '../store/createApiStore';
import type { BaseResponse } from '@/types/model/base.response.type';
import type { CourseModel } from '@/types/model/course.type';

export const userCourseStore = createApiStore<BaseResponse<CourseModel[]>>();
export const userCourseDetailStore = createApiStore<BaseResponse<CourseModel>>();

export const CourseService = {
  getAllCourses: () => userCourseStore.getState().fetch('/courses'),
  getCourseById: (id: string) => userCourseDetailStore.getState().fetch(`/courses/${id}`),
};