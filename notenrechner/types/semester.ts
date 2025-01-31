export interface Lecture {
  id: number
  week: number
  date: string
  day: string
  startTime: string
  endTime: string
  subject: string
  teacher: string
  class: string
  room: string
  title: string
  grade?: number
}

export interface SubjectGrades {
  subject: string
  numberOfExams: number
  average: number
  roundedQuarter: number
  roundedHalf: number
  desiredGrade: number
  requiredGrade: number
}

