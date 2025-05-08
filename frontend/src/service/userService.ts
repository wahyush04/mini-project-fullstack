import type { UserModel } from '../types/user';
import { createApiStore } from '../store/createApiStore';

// Create stores with appropriate type parameters
export const useUserStore = createApiStore<UserModel>();

// User-related API service
export const UserService = {
    // Get paginated list of users
    getUsers: async (page = 1, limit = 10) => {
        return useUserStore.getState().fetch(`/users?page=${page}&limit=${limit}`);
    },

    // Get single user by ID
    getAllUsers: async () => {
        return useUserStore.getState().fetch(`/users/`);
    },

    // Get single user by ID
    getUserById: async (id: string) => {
        return useUserStore.getState().fetch(`/users/${id}`);
    },

    // Create new user
    createUser: async (userData: Omit<UserModel, 'id' | 'createdAt' | 'updatedAt'>) => {
        return useUserStore.getState().post('/users', userData);
    },

    // Update existing user
    updateUser: async (id: string, userData: Partial<UserModel>) => {
        return useUserStore.getState().patch(`/users/${id}`, userData);
    },

    // Delete user
    deleteUser: async (id: string) => {
        return useUserStore.getState().remove(`/users/${id}`);
    },
};