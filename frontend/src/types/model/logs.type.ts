export interface LogModel {
    id: string;
    userId: string;
    code: string;
    description: string;
    data: LogDataModel;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LogDataModel{
    point: number
}