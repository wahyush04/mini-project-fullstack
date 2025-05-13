export interface TryoutSectionModel {
  id: string
  code: string
  description: string
  title: string
  order: number
  data: {
    type: "telegram" | "website" | "accuracy_test"
    image: string
    level: string
    point: number
    startDate: string
    endDate: string
    estimateTime: number
    totalStudent: number
  }
  tag: string
  active: boolean
  createdAt: string
  updatedAt: string
}


