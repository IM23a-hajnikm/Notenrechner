"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Import } from 'lucide-react'
import { Lecture } from "@/types/semester"
import { AddExamDialog } from "./add-exam-dialog"
import { ImportDialog } from "./import-dialog"; // Import the new component

const subjectColors: Record<string, string> = {
  M: "bg-red-100",
  D: "bg-yellow-100",
  GuP: "bg-green-100",
  E: "bg-blue-100",
  WR: "bg-purple-100",
  Frw: "bg-pink-100",
  TuU: "bg-orange-100",
  M320: "bg-indigo-100",
  M294: "bg-cyan-100",
}

interface SemesterOverviewProps {
  lectures: Lecture[]
  onGradeChange: (id: number, grade: number | undefined) => void
  onAddExam: (exam: Partial<Lecture>) => void
}

export function SemesterOverview({ lectures, onGradeChange, onAddExam }: SemesterOverviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Semester Overview</h2>
        <div className="flex gap-2">
          <ImportDialog />
          <AddExamDialog onAddExam={onAddExam} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Woche</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead>Zeit</TableHead>
            <TableHead>Lektion</TableHead>
            <TableHead>Lehrperson</TableHead>
            <TableHead>Klasse</TableHead>
            <TableHead>Raum</TableHead>
            <TableHead>Titel</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lectures.map((lecture) => (
            <TableRow key={lecture.id}>
              <TableCell>{lecture.id}</TableCell>
              <TableCell>{lecture.week}</TableCell>
              <TableCell>{lecture.date}</TableCell>
              <TableCell>{lecture.day}</TableCell>
              <TableCell>{`${lecture.startTime}-${lecture.endTime}`}</TableCell>
              <TableCell className={subjectColors[lecture.subject] || "bg-gray-100"}>
                {lecture.subject}
              </TableCell>
              <TableCell>{lecture.teacher}</TableCell>
              <TableCell>{lecture.class}</TableCell>
              <TableCell>{lecture.room}</TableCell>
              <TableCell>{lecture.title}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  step={0.1}
                  value={lecture.grade || ""}
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : undefined
                    onGradeChange(lecture.id, value)
                  }}
                  className="w-16 h-8 text-center bg-secondary"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

