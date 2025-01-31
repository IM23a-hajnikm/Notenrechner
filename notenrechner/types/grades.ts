export interface Subject {
  name: string
  semesterGrades: (number | null)[]
  examGrades: (number | null)[]
  finalGrade?: number
}

export interface GradeCalculation {
  subjects: Subject[]
  overallAverage: number
  failingGrades: number
  maxDeviation: number
  hasPassed: boolean
}

export interface SemesterAverage {
  subject: string
  average: number
}

export interface SemesterData {
  lectures: Lecture[]
  averages: SemesterAverage[]
}

