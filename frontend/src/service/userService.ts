import type { UserModel } from '../types/model/user.type';
import { createApiStore } from '../store/createApiStore';

// Create stores with appropriate type parameters
export const useUserStore = createApiStore<UserModel>();

export const UserService = {
    getUserById: async (id: string) => {
        return useUserStore.getState().fetch(`/users/${id}`);
    },

};