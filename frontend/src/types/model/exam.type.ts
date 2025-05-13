import type { ExamStatusType } from "../enum/ExamStatusType";

export interface ExamModel {
    id: string;
    userId: string;
    data: {
        status: ExamStatusType;
    };
    tag: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
