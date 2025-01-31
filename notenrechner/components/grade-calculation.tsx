"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SubjectGrades } from "@/types/semester"

interface GradeCalculationProps {
  grades: SubjectGrades[]
  average: number
}

export function GradeCalculation({ grades, average }: GradeCalculationProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Semester Overview Durchschnitt</h2>
        <div className="text-lg font-semibold">
          Durchschnitt: {average.toFixed(2)}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fach</TableHead>
            <TableHead>Anzahl Prüfungen</TableHead>
            <TableHead>Notendurchschnitt</TableHead>
            <TableHead>Gerundet 0.25</TableHead>
            <TableHead>Gerundet 0.5</TableHead>
            <TableHead>Wunschnote</TableHead>
            <TableHead>benötigte Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {grades.map((grade) => (
            <TableRow key={grade.subject}>
              <TableCell>{grade.subject}</TableCell>
              <TableCell>{grade.numberOfExams}</TableCell>
              <TableCell
                className={
                  grade.average < 4
                    ? "bg-red-100"
                    : grade.average >= 5
                    ? "bg-green-100"
                    : "bg-yellow-100"
                }
              >
                {grade.average.toFixed(2)}
              </TableCell>
              <TableCell>{grade.roundedQuarter.toFixed(2)}</TableCell>
              <TableCell>{grade.roundedHalf.toFixed(2)}</TableCell>
              <TableCell>{grade.desiredGrade.toFixed(1)}</TableCell>
              <TableCell
                className={
                  grade.requiredGrade > 6
                    ? "bg-red-100"
                    : grade.requiredGrade <= 4
                    ? "bg-green-100"
                    : "bg-yellow-100"
                }
              >
                {grade.requiredGrade.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

