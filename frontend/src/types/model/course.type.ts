export interface CourseModel {
    id: string;
    code: string;
    title: string;
    description: string;
    order: number;
    data: {
        type: string;
        image: string;
        level: string;
        point: number;
        estimateTime: number;
        totalStudent: number;
    };
    tag: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}