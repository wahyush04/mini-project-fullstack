export interface LogDataModel {
    point: number;
}

export interface LogRequestData {
    userId: string;
    code: string;
    action: string;
    description: string;
    data: LogDataModel;
}

export interface CreateLogRequest {
    data: LogRequestData;
    examId: string;
}

