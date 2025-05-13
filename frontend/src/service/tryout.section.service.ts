import { createApiStore } from '../store/createApiStore';
import type { BaseResponse } from '@/types/model/base.response.type';
import type { TryoutSectionModel } from '@/types/model/tryout.section.type';

export const useTryoutSectionStore = createApiStore<BaseResponse<TryoutSectionModel[]>>();
export const useTryoutSectionDetailStore = createApiStore<BaseResponse<TryoutSectionModel>>();

export const TryoutSectionService = {

    getAllTryoutSections: async () => {
        return useTryoutSectionStore.getState().fetch(`/tryout-sections/`);
    },

    getTryoutSection: async (id: string) => {
        return useTryoutSectionDetailStore.getState().fetch(`/tryout-sections/${id}`);
    },
};