"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from 'lucide-react'

type Subject = {
  name: string
  currentGrade: number
  requiredGrade: number
}

type Semester = {
  number: number
  subjects: Subject[]
}

const mockSemesters: Semester[] = [
  {
    number: 1,
    subjects: [
      { name: "Mathematik", currentGrade: 4.5, requiredGrade: 4.0 },
      { name: "Deutsch", currentGrade: 5.0, requiredGrade: 4.0 },
      { name: "Englisch", currentGrade: 4.0, requiredGrade: 4.0 },
      { name: "Geschichte", currentGrade: 3.5, requiredGrade: 4.0 },
      { name: "Biologie", currentGrade: 5.5, requiredGrade: 4.0 },
    ]
  },
  {
    number: 2,
    subjects: [
      { name: "Mathematik", currentGrade: 4.2, requiredGrade: 4.0 },
      { name: "Deutsch", currentGrade: 4.8, requiredGrade: 4.0 },
      { name: "Englisch", currentGrade: 4.5, requiredGrade: 4.0 },
      { name: "Geschichte", currentGrade: 3.8, requiredGrade: 4.0 },
      { name: "Biologie", currentGrade: 5.2, requiredGrade: 4.0 },
    ]
  },
]

export function SemesterPrognose() {
  const [selectedSemester, setSelectedSemester] = useState(mockSemesters[0].number.toString())

  const getProgressColor = (current: number, required: number) => {
    if (current >= required + 1) return "bg-green-500"
    if (current >= required) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min(Math.max((current / required) * 100, 0), 100)
  }

  const selectedSemesterData = mockSemesters.find(semester => semester.number.toString() === selectedSemester) || mockSemesters[0]

  const averageGrade = selectedSemesterData.subjects.reduce((sum, subject) => sum + subject.currentGrade, 0) / selectedSemesterData.subjects.length
  const isPassing = averageGrade >= 4.0 && selectedSemesterData.subjects.filter(subject => subject.currentGrade < subject.requiredGrade).length <= 1

  return (
    <div className="space-y-4">
      <Select onValueChange={setSelectedSemester} defaultValue={selectedSemester}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semester wählen" />
        </SelectTrigger>
        <SelectContent>
          {mockSemesters.map((semester) => (
            <SelectItem key={semester.number} value={semester.number.toString()}>
              Semester {semester.number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedSemesterData.subjects.map((subject) => (
        <div key={subject.name} className="space-y-2">
          <div className="flex justify-between">
            <span>{subject.name}</span>
            <span>Note: {subject.currentGrade.toFixed(1)} / Erforderlich: {subject.requiredGrade.toFixed(1)}</span>
          </div>
          <Progress
            value={getProgressPercentage(subject.currentGrade, subject.requiredGrade)}
            className={getProgressColor(subject.currentGrade, subject.requiredGrade)}
          />
        </div>
      ))}

      <Alert variant={isPassing ? "default" : "destructive"}>
        {isPassing ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
        <AlertTitle>Semesterprognose</AlertTitle>
        <AlertDescription>
          {isPassing
            ? `Du bist auf einem guten Weg, Semester ${selectedSemester} zu bestehen. Dein Notendurchschnitt beträgt ${averageGrade.toFixed(2)}.`
            : `Du musst dich noch verbessern, um Semester ${selectedSemester} zu bestehen. Dein aktueller Notendurchschnitt beträgt ${averageGrade.toFixed(2)}.`}
        </AlertDescription>
      </Alert>
    </div>
  )
}

