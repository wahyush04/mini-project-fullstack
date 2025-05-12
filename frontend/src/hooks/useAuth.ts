// src/hooks/useUser.ts
import { useCallback } from 'react';
import { useAuthStore, AuthService   } from '../service/authService';
import { useApiError } from './useApi';
import type { RegisterRequestModel } from '../types/request/register.request';

export const useAuth = () => {
    // Get store state
    const { state, reset } = useAuthStore();
    const { data: authData, isLoading, isError, error, status } = state;

    // Handle errors with custom hook
    const { getErrorMessage } = useApiError(error);

    // Fetch user by ID
    const login = useCallback(async (email: string, password: string) => {
        return await AuthService.login(email, password);
    }, []);

    // Create new user
    const register = useCallback(async (request: RegisterRequestModel) => {
        return await AuthService.register(request);
    }, []);

    return {
        authData,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        login,
        register,
        reset
    };
};