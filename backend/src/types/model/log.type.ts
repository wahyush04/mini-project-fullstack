import { ExamsCompleteType } from "../enum/exams.complete.type"

export interface LogModel {
    id: string;
    userId: string;
    code: ExamsCompleteType;
    active: boolean;
    description: string;
    data: LogDataModel;
}

export interface LogDataModel {
    point: number;
}