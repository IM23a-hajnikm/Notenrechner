export interface Module {
  number: string
  name: string
  grade: number | null
  category: 'competencies' | 'uk' | 'ipa'
}

export interface EFZCalculation {
  competenciesAverage: number
  ukAverage: number
  ipaGrade: number
  hasPassed: boolean
}

