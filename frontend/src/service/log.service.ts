import { createApiStore } from '../store/createApiStore';
import type { LogModel } from '../types/model/logs.type';
import type { BaseResponse } from '../types/model/base.response.type';
import type { CreateLogRequest } from '@/types/request/createLogRequest';

export const useLogStore = createApiStore<BaseResponse<LogModel[]>>();
export const useCreateLogStore = createApiStore<BaseResponse<LogModel>>();

export const LogService = {
    getAllLogs: async () => {
        return useLogStore.getState().fetch(`/logs/completed-exams`);
    },

    createAndUpdateStatus: async (req: CreateLogRequest) => {
        return useCreateLogStore.getState().post(`/logs/create-and-update`, req);
    },
};