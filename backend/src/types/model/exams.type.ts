import { CompleteStatusType } from "../enum/complete.status.type"

export interface ExamsModel {
    id: string;
    userId: string;
    tag: string;
    active: boolean;
    data: ExamsDataModel;
}

export interface ExamsDataModel {
    status: CompleteStatusType;
}