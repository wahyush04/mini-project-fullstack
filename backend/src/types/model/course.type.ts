export interface CourseModel {
    id: string | undefined;
    code: string;
    title: string;
    order: number;
    tag: string;
    description: string;
    data: DataCourseDTO;
}

export interface DataCourseDTO {
    point: number,
    type: string
}
