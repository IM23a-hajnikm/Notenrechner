"use client"

import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SemesterOverview } from "@/components/semester-overview"
import { GradeCalculation } from "@/components/grade-calculation"
import { Lecture, SubjectGrades, SemesterData, SemesterAverage } from "@/types/semester"
import { ImportDialog } from "@/components/import-dialog"
import { Input } from "@/components/ui/input";

const initialSemesterData: Lecture[][] = Array(6).fill([]).map((_, index) => [
  {
    id: index * 1000 + 1,
    week: 36,
    date: `26.08.${2024 + Math.floor(index / 2)}`,
    day: "Montag",
    startTime: "13:30",
    endTime: "14:15",
    subject: "M",
    teacher: "Sarah Kanz",
    class: `i${Math.floor(index / 2) + 1}a`,
    room: "303",
    title: "",
  },
  {
    id: index * 1000 + 2,
    week: 37,
    date: `13.09.${2024 + Math.floor(index / 2)}`,
    day: "Freitag",
    startTime: "10:40",
    endTime: "11:25",
    subject: "GuP",
    teacher: "Ines Eigenmann III",
    class: `i${Math.floor(index / 2) + 1}a`,
    room: "305",
    title: "",
  },
  {
    id: index * 1000 + 3,
    week: 38,
    date: `16.09.${2024 + Math.floor(index / 2)}`,
    day: "Montag",
    startTime: "09:35",
    endTime: "10:20",
    subject: "D",
    teacher: "Anna Richi",
    class: `i${Math.floor(index / 2) + 1}a`,
    room: "",
    title: "",
  },
])

function calculateGrades(lectures: Lecture[]): { grades: SubjectGrades[], average: number } {
  const subjectGrades = new Map<string, number[]>()
  
  lectures.forEach(lecture => {
    if (lecture.grade) {
      const grades = subjectGrades.get(lecture.subject) || []
      grades.push(lecture.grade)
      subjectGrades.set(lecture.subject, grades)
    }
  })

  const grades: SubjectGrades[] = Array.from(subjectGrades.entries()).map(([subject, grades]) => {
    const average = grades.reduce((a, b) => a + b, 0) / grades.length
    const roundedQuarter = Math.round(average * 4) / 4
    const roundedHalf = Math.round(average * 2) / 2
    const desiredGrade = 4.5
    const requiredGrade = calculateRequiredGrade(grades, desiredGrade)

    return {
      subject,
      numberOfExams: grades.length,
      average,
      roundedQuarter,
      roundedHalf,
      desiredGrade,
      requiredGrade
    }
  })

  const totalGrades = Array.from(subjectGrades.values()).flat()
  const average = totalGrades.length > 0 
    ? totalGrades.reduce((a, b) => a + b, 0) / totalGrades.length 
    : 0

  return { grades, average }
}

function calculateRequiredGrade(existingGrades: number[], targetAverage: number): number {
  if (existingGrades.length === 0) return targetAverage
  
  const currentSum = existingGrades.reduce((a, b) => a + b, 0)
  const requiredSum = targetAverage * (existingGrades.length + 1)
  return requiredSum - currentSum
}

function calculateSemesterAverages(lectures: Lecture[]): SemesterAverage[] {
  const subjectGrades: { [key: string]: number[] } = {}

  lectures.forEach(lecture => {
    if (lecture.grade) {
      if (!subjectGrades[lecture.subject]) {
        subjectGrades[lecture.subject] = []
      }
      subjectGrades[lecture.subject].push(lecture.grade)
    }
  })

  return Object.entries(subjectGrades).map(([subject, grades]) => ({
    subject,
    average: grades.reduce((sum, grade) => sum + grade, 0) / grades.length
  }))
}

export default function SemesternotenPage() {
  const [semesters, setSemesters] = useState<SemesterData[]>(
    initialSemesterData.map(lectures => ({ lectures, averages: [] }))
  )
  const [currentSemester, setCurrentSemester] = useState(0)

  const { grades, average } = calculateGrades(semesters[currentSemester].lectures)

  useEffect(() => {
    const newAverages = calculateSemesterAverages(semesters[currentSemester].lectures)
    setSemesters(prev => prev.map((semester, index) => 
      index === currentSemester ? { ...semester, averages: newAverages } : semester
    ))
  }, [semesters[currentSemester].lectures, currentSemester])

  const handleGradeChange = (id: number, grade: number | undefined) => {
    setSemesters(prev => prev.map((semester, index) => 
      index === currentSemester
        ? {
            ...semester,
            lectures: semester.lectures.map(lecture =>
              lecture.id === id ? { ...lecture, grade } : lecture
            )
          }
        : semester
    ))
  }

  const handleAddExam = (exam: Partial<Lecture>) => {
    setSemesters(prev => prev.map((semester, index) => 
      index === currentSemester
        ? {
            ...semester,
            lectures: [...semester.lectures, { ...exam, id: Math.max(0, ...semester.lectures.map(l => l.id)) + 1 } as Lecture]
          }
        : semester
    ))
  }

  return (
    <div className="container py-6">
      <Card>
        <CardContent className="p-6">
          <Tabs value={currentSemester.toString()} onValueChange={(value) => setCurrentSemester(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-6">
              {Array.from({ length: 6 }, (_, i) => (
                <TabsTrigger key={i} value={i.toString()}>
                  Semester {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {semesters.map((_, index) => (
              <TabsContent key={index} value={index.toString()}>
                <Accordion type="single" defaultValue="overview" collapsible>
                  <AccordionItem value="overview">
                    <AccordionTrigger>Semester Overview</AccordionTrigger>
                    <AccordionContent>
                      <SemesterOverview
                        lectures={semesters[currentSemester].lectures}
                        onGradeChange={handleGradeChange}
                        onAddExam={handleAddExam}
                      />
                      <ImportDialog />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="calculation">
                    <AccordionTrigger>Semester Overview Durchschnitt</AccordionTrigger>
                    <AccordionContent>
                      <GradeCalculation grades={grades} average={average} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

