// src/hooks/useUser.ts
import { useCallback, useEffect } from 'react';
import { useLogStore, LogService } from '../service/log.service';
import { useApiError } from './useApi';

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