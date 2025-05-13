import type { BaseResponse } from '@/types/model/base.response.type';
import { createApiStore } from '../store/createApiStore';
import type { LoginModel, RegisterResponseModel } from '../types/model/auth.type';
import type { RegisterRequestModel } from '../types/request/register.request';

export const useAuthStore = createApiStore<LoginModel>();
export const useRegisterStore = createApiStore<BaseResponse<RegisterResponseModel>>();

export const AuthService = {
    login: async (email: string, password: string) => {
        return useAuthStore.getState().post(`/auth/login`, { email, password });
    },

    register: async (request: RegisterRequestModel) => {
        return useRegisterStore.getState().post(`/auth/register`, request);
    },
};