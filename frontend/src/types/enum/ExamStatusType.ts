export const ExamStatusType = {
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    SUBMITTED: 'submitted',
  } as const;
  
  export type ExamStatusType = (typeof ExamStatusType)[keyof typeof ExamStatusType];
  