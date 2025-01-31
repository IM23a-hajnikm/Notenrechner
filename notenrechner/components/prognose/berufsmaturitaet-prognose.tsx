"use client"

import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from 'lucide-react'

type Subject = {
  name: string
  currentGrade: number
  requiredGrade: number
}

const mockSubjects: Subject[] = [
  { name: "Deutsch", currentGrade: 4.5, requiredGrade: 4.0 },
  { name: "Französisch", currentGrade: 4.2, requiredGrade: 4.0 },
  { name: "Englisch", currentGrade: 5.0, requiredGrade: 4.0 },
  { name: "Mathematik", currentGrade: 4.8, requiredGrade: 4.0 },
  { name: "Wirtschaft und Recht", currentGrade: 4.3, requiredGrade: 4.0 },
  { name: "Finanz- und Rechnungswesen", currentGrade: 4.7, requiredGrade: 4.0 },
  { name: "Geschichte und Politik", currentGrade: 3.8, requiredGrade: 4.0 },
  { name: "Technik und Umwelt", currentGrade: 4.1, requiredGrade: 4.0 },
]

export function BerufsmaturitaetPrognose() {
  const getProgressColor = (current: number, required: number) => {
    if (current >= required + 1) return "bg-green-500"
    if (current >= required) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min(Math.max((current / required) * 100, 0), 100)
  }

  const averageGrade = mockSubjects.reduce((sum, subject) => sum + subject.currentGrade, 0) / mockSubjects.length
  const failingSubjects = mockSubjects.filter(subject => subject.currentGrade < subject.requiredGrade)
  const isPassing = averageGrade >= 4.0 && failingSubjects.length <= 2

  return (
    <div className="space-y-4">
      {mockSubjects.map((subject) => (
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
        <AlertTitle>Berufsmaturität-Prognose</AlertTitle>
        <AlertDescription>
          {isPassing
            ? `Du bist auf einem guten Weg, deine Berufsmaturität zu bestehen. Dein Notendurchschnitt beträgt ${averageGrade.toFixed(2)}.`
            : `Du musst dich noch in einigen Fächern verbessern, um deine Berufsmaturität zu bestehen. Dein aktueller Notendurchschnitt beträgt ${averageGrade.toFixed(2)}. Du hast ${failingSubjects.length} ungenügende Note${failingSubjects.length !== 1 ? 'n' : ''}.`}
        </AlertDescription>
      </Alert>
    </div>
  )
}

