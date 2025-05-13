// src/hooks/useUser.ts
import { useCallback, useEffect } from 'react';
import { userCourseStore, CourseService } from '../service/course.service';
import { useApiError } from './useApi';

export const useCourses = () => {
    // Get store state
    const { state, reset } = userCourseStore();
    const { data: courses, isLoading, isError, error, status } = state;

    const { getErrorMessage } = useApiError(error);

    const fetchCourses = useCallback(async () => {
        return await CourseService.getAllCourses();
        
    }, []);

    useEffect(() => {
        fetchCourses();
        return () => reset();
    }, [fetchCourses, reset]);

    return {
        courses,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        fetchCourses,
        reset
    };
};