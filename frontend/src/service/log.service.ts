import { createApiStore } from '../store/createApiStore';
import type { LogModel } from '../types/logs.type';
import type { BaseResponse } from '../types/base.response.type';

export const useLogStore = createApiStore<BaseResponse<LogModel[]>>();

export const LogService = {
    getAllLogs: async () => {
        return useLogStore.getState().fetch(`/logs/completed-exams`);
    },
};