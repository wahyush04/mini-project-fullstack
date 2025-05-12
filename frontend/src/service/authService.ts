import { createApiStore } from '../store/createApiStore';
import type { LoginModel } from '../types/auth.type';
import type { RegisterRequestModel } from '../types/request/register.request';

// Create stores with appropriate type parameters
export const useAuthStore = createApiStore<LoginModel>();

// User-related API service
export const AuthService = {
    // Get paginated list of users
    login: async (email: string, password: string) => {
        return useAuthStore.getState().post(`/auth/login`, { email, password });
    },

    // Get single user by ID
    register: async (request: RegisterRequestModel) => {
        return useAuthStore.getState().post(`/users/`, {request});
    },
};