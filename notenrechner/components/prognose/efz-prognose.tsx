"use client"

import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from 'lucide-react'

type Module = {
  name: string
  currentGrade: number
  requiredGrade: number
}

const mockModules: Module[] = [
  { name: "Berufliche Kompetenzen", currentGrade: 4.5, requiredGrade: 4.0 },
  { name: "Überbetriebliche Kurse", currentGrade: 4.8, requiredGrade: 4.0 },
  { name: "IPA", currentGrade: 4.2, requiredGrade: 4.0 },
]

export function EFZPrognose() {
  const getProgressColor = (current: number, required: number) => {
    if (current >= required + 1) return "bg-green-500"
    if (current >= required) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min(Math.max((current / required) * 100, 0), 100)
  }

  const averageGrade = mockModules.reduce((sum, module) => sum + module.currentGrade, 0) / mockModules.length
  const isPassing = mockModules.every(module => module.currentGrade >= module.requiredGrade)

  return (
    <div className="space-y-4">
      {mockModules.map((module) => (
        <div key={module.name} className="space-y-2">
          <div className="flex justify-between">
            <span>{module.name}</span>
            <span>Note: {module.currentGrade.toFixed(1)} / Erforderlich: {module.requiredGrade.toFixed(1)}</span>
          </div>
          <Progress
            value={getProgressPercentage(module.currentGrade, module.requiredGrade)}
            className={getProgressColor(module.currentGrade, module.requiredGrade)}
          />
        </div>
      ))}

      <Alert variant={isPassing ? "default" : "destructive"}>
        {isPassing ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
        <AlertTitle>EFZ-Prognose</AlertTitle>
        <AlertDescription>
          {isPassing
            ? `Du bist auf einem guten Weg, dein EFZ zu bestehen. Dein Notendurchschnitt beträgt ${averageGrade.toFixed(2)}.`
            : `Du musst dich noch in einigen Bereichen verbessern, um dein EFZ zu bestehen. Dein aktueller Notendurchschnitt beträgt ${averageGrade.toFixed(2)}.`}
        </AlertDescription>
      </Alert>
    </div>
  )
}

