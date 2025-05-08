// src/hooks/useUser.ts
import { useCallback, useEffect } from 'react';
import type { UserModel } from '../types/user';
import { useUserStore, UserService } from '../service/userService';
import { useApiError } from './useApi';

export const useUser = (userId?: string) => {
    // Get store state
    const { state, reset } = useUserStore();
    const { data: user, isLoading, isError, error, status } = state;

    // Handle errors with custom hook
    const { getErrorMessage } = useApiError(error);

    // Fetch user by ID
    const fetchUsers = useCallback(async () => {
        return await UserService.getAllUsers();
    }, []);

    // Fetch user by ID
    const fetchUser = useCallback(async (id: string) => {
        return await UserService.getUserById(id);
    }, []);

    // Create new user
    const createUser = useCallback(async (userData: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>) => {
        return await UserService.createUser(userData);
    }, []);

    // Update existing user
    const updateUser = useCallback(async (id: string, userData: Partial<UserModel>) => {
        return await UserService.updateUser(id, userData);
    }, []);

    // Delete user
    const deleteUser = useCallback(async (id: string) => {
        return await UserService.deleteUser(id);
    }, []);

    // Load user data if ID is provided
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
        createUser,
        updateUser,
        deleteUser,
        reset
    };
};