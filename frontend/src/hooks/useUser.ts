import { useCallback, useEffect } from 'react';
import { useUserStore, UserService } from '../service/userService';
import { useApiError } from './useApi';

export const useUser = (userId?: string) => {
    const { state, reset } = useUserStore();
    const { data: user, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const fetchUser = useCallback(async (id: string) => {
        return await UserService.getUserById(id);
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }

        // Cleanup on unmount
        return () => reset();
    }, [userId, fetchUser, reset]);

    return {
        user,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        fetchUser,
        reset
    };
};