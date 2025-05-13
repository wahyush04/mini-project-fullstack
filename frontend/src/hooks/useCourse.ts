import { useCallback, useEffect } from 'react';
import { userCourseDetailStore, CourseService } from '../service/course.service';
import { useApiError } from './useApi';

export const useCourse = () => {
    const { state, reset } = userCourseDetailStore();
    const { data: course, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const fetchCourse = useCallback(async (id: string) => {
        return await CourseService.getCourseById(id);
    }, []);

    return {
        course,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        fetchCourse,
        reset
    };
};