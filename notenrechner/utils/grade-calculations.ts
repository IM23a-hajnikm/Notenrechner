import { GradeCalculation, Subject } from "@/types/grades"

export function calculateAverage(numbers: (number | null)[]): number {
  const validNumbers = numbers.filter((n): n is number => n !== null)
  if (validNumbers.length === 0) return 0
  return Number((validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length).toFixed(1))
}

export function calculateFinalGrade(subject: Subject): number {
  const semesterAverage = calculateAverage(subject.semesterGrades)
  const examAverage = calculateAverage(subject.examGrades)
  
  // If we have both semester and exam grades, calculate weighted average
  if (semesterAverage && examAverage) {
    return Number(((semesterAverage + examAverage) / 2).toFixed(1))
  }
  
  // If we only have semester grades
  if (semesterAverage) {
    return semesterAverage
  }
  
  // If we only have exam grades
  if (examAverage) {
    return examAverage
  }
  
  return 0
}

export function evaluateGrades(subjects: Subject[]): GradeCalculation {
  const subjectsWithFinals = subjects.map(subject => ({
    ...subject,
    finalGrade: calculateFinalGrade(subject)
  }))

  const finalGrades = subjectsWithFinals.map(s => s.finalGrade).filter(g => g > 0)
  const overallAverage = Number((finalGrades.reduce((a, b) => a + b, 0) / finalGrades.length).toFixed(1))
  
  const failingGrades = finalGrades.filter(grade => grade < 4.0).length
  
  const deviations = finalGrades
    .filter(grade => grade < 4.0)
    .map(grade => 4.0 - grade)
  const maxDeviation = Math.max(...deviations, 0)

  const hasPassed = 
    overallAverage >= 4.0 && 
    failingGrades <= 2 && 
    maxDeviation <= 2.0

  return {
    subjects: subjectsWithFinals,
    overallAverage,
    failingGrades,
    maxDeviation,
    hasPassed
  }
}

