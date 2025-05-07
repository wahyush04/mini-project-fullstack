import { TryoutSectionType } from "../enum/tryout.section.type"
export interface TryoutSectionModel {
    id: string;
    code: string;
    description: string;
    title: string;
    order: number;
    tag: string;
    data: TryoutSectionDataModel;
}

export interface TryoutSectionDataModel {
    point: number;
    type: TryoutSectionType;
    startDate: Date;
    endDate: Date;
}