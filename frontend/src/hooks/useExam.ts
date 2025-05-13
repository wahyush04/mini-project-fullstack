import { useCallback, useEffect } from 'react';
import { useExamStore, useUpdateStatusExamStore, ExamService } from '../service/examService';
import { useApiError } from './useApi';
import type { CreateExamRequestModel } from '@/types/request/createExamRequest';
import type { ExamStatusType } from '@/types/enum/ExamStatusType';

export const useCreateExam = () => {
    const { state, reset } = useExamStore();
    const { data: result, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const createExam = useCallback(async (data: CreateExamRequestModel) => {
        return await ExamService.createExam(data);
    }, []);

    return {
        result,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        createExam,
        reset
    };
};

export const useUpdateExam = () => {
    const { state, reset } = useUpdateStatusExamStore();
    const { data: updatedExam, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const updateExamStatus = useCallback(async (id: string, status: ExamStatusType) => {
        return await ExamService.updateStatusExam(id, status);
    }, []);

    return {
        updatedExam,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        updateExamStatus,
        reset
    };
};