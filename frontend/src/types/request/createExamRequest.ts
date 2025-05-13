import type { ExamStatusType } from "../enum/ExamStatusType";

export interface CreateExamRequestModel {
  userId: string;
  tag: string;
  data: {
    status: ExamStatusType;
  };
}

