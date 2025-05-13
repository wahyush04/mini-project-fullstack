// src/hooks/useUser.ts
import { use, useCallback, useEffect } from 'react';
import { useLogStore, useCreateLogStore, LogService } from '../service/log.service';
import { useApiError } from './useApi';
import type { CreateLogRequest } from '@/types/request/createLogRequest';

export const useLog = () => {
    // Get store state
    const { state, reset } = useLogStore();
    const { data: logData, isLoading, isError, error, status } = state;

    const { getErrorMessage } = useApiError(error);

    const getAllLogs = useCallback(async () => {
        return await LogService.getAllLogs();
    }, []);

    useEffect(() => {
        getAllLogs();
        return () => reset();
    }, [getAllLogs, reset]);

    return {
        logData,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        getAllLogs,
        reset
    };
};

export const useCreateLog = () => {
    // Get store state
    const { state, reset } = useCreateLogStore();
    const { data: createLogResponse, isLoading, isError, error, status } = state;

    const { getErrorMessage } = useApiError(error);

    const createLog = useCallback(async (req: CreateLogRequest) => {
        return await LogService.createAndUpdateStatus(req);
    }, []);

    return {
        createLogResponse,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        createLog,
        reset
    };
};