// src/hooks/useUser.ts
import { useCallback } from 'react';
import { useAuthStore, AuthService, useRegisterStore   } from '../service/authService';
import { useApiError } from './useApi';
import type { RegisterRequestModel } from '../types/request/register.request';

export const useAuth = () => {
    const { state, reset } = useAuthStore();
    const { data: authData, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const login = useCallback(async (email: string, password: string) => {
        return await AuthService.login(email, password);
    }, []);

    return {
        authData,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        login,
        reset
    };
};

export const useRegister = () => {
    const { state, reset } = useRegisterStore();
    const { data: registerData, isLoading, isError, error, status } = state;
    const { getErrorMessage } = useApiError(error);

    const register = useCallback(async (request: RegisterRequestModel) => {
        return await AuthService.register(request);
    }, []);

    return {
        registerData,
        isLoading,
        isError,
        error,
        errorMessage: getErrorMessage(),
        status,
        register,
        reset
    };
};