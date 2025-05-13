import type { ExamStatusType } from '@/types/enum/ExamStatusType';
import { createApiStore } from '../store/createApiStore';
import type { BaseResponse } from '@/types/model/base.response.type';
import type { CreateExamRequestModel } from '@/types/request/createExamRequest';
import type { ExamModel } from '@/types/model/exam.type';

export const useExamStore = createApiStore<BaseResponse<ExamModel>>();
export const useUpdateStatusExamStore = createApiStore<BaseResponse<ExamModel>>();

export const ExamService = {

    createExam: async (req: CreateExamRequestModel) => {
        return useExamStore.getState().post(`/exams/`, req);
    },

    updateStatusExam: async (id: string, status: ExamStatusType) => {
        return useUpdateStatusExamStore.getState().put(`/exams/${id}`, status);
    },
};