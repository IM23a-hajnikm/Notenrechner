"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Subject, SemesterData } from "@/types/grades"
import { evaluateGrades } from "@/utils/grade-calculations"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle } from 'lucide-react'

const initialSubjects: Subject[] = [
  { name: "Deutsch", semesterGrades: [null, null, null, null, null, null], examGrades: [null, null] },
  { name: "Französisch", semesterGrades: [null, null, null, null, null, null], examGrades: [null, null] },
  { name: "Englisch", semesterGrades: [null, null, null, null, null, null], examGrades: [null, null] },
  { name: "Mathematik", semesterGrades: [null, null, null, null, null, null], examGrades: [null] },
  { name: "Wirtschaft und Recht", semesterGrades: [null, null, null, null, null, null], examGrades: [null] },
  { name: "Finanz- und Rechnungswesen", semesterGrades: [null, null, null, null, null, null], examGrades: [null] },
  { name: "Geschichte und Politik", semesterGrades: [null, null, null, null, null, null], examGrades: [] },
  { name: "Technik und Umwelt", semesterGrades: [null, null, null, null, null, null], examGrades: [] },
  { name: "IDPA", semesterGrades: [null, null, null, null, null, null], examGrades: [] },
  { name: "IDAF", semesterGrades: [null], examGrades: [] }
]

export default function BerufsmaturitaetPage() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects)
  const [semesterData, setSemesterData] = useState<SemesterData[]>([])

  useEffect(() => {
    // This effect would normally fetch the semester data from an API or context
    // For now, we'll just use mock data
    const mockSemesterData: SemesterData[] = [
      { lectures: [], averages: [{ subject: "Deutsch", average: 4.5 }] },
      { lectures: [], averages: [{ subject: "Deutsch", average: 4.7 }] },
      // ... add more mock data for other semesters
    ]
    setSemesterData(mockSemesterData)
  }, [])

  useEffect(() => {
    if (semesterData.length > 0) {
      setSubjects(prev => prev.map(subject => {
        const updatedGrades = subject.semesterGrades.map((grade, index) => {
          const semesterAverage = semesterData[index]?.averages.find(avg => avg.subject === subject.name)
          return semesterAverage ? semesterAverage.average : grade
        })
        return { ...subject, semesterGrades: updatedGrades }
      }))
    }
  }, [semesterData])

  const results = evaluateGrades(subjects)

  const handleGradeChange = (
    subjectIndex: number,
    gradeType: "semester" | "exam",
    gradeIndex: number,
    value: string
  ) => {
    const newValue = value === "" ? null : Number(value)
    if (newValue !== null && (newValue < 1 || newValue > 6)) return

    setSubjects(prev => prev.map((subject, idx) => {
      if (idx !== subjectIndex) return subject
      
      return {
        ...subject,
        [gradeType === "semester" ? "semesterGrades" : "examGrades"]: subject[
          gradeType === "semester" ? "semesterGrades" : "examGrades"
        ].map((grade, gIdx) => (gIdx === gradeIndex ? newValue : grade))
      }
    }))
  }

  const isGradeEditable = (subject: Subject, semesterIndex: number) => {
    switch (subject.name) {
      case "Geschichte und Politik":
        return semesterIndex < 4
      case "Technik und Umwelt":
        return semesterIndex >= 1 && semesterIndex < 5
      case "IDPA":
        return semesterIndex === 5
      case "IDAF":
        return semesterIndex === 2 || semesterIndex === 3
      default:
        return true
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Berufsmaturität Notenrechner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Tragen Sie Ihre Noten in die Felder ein!
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Prüfungsfach</TableHead>
                  <TableHead colSpan={6}>Zeugnisnoten</TableHead>
                  <TableHead colSpan={2}>Prüfungsnoten</TableHead>
                  <TableHead>Fachnote</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject, subjectIndex) => (
                  <TableRow key={subject.name}>
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    {[...Array(6)].map((_, i) => (
                      <TableCell key={`semester-${i}`} className="p-1">
                        {isGradeEditable(subject, i) ? (
                          <Input
                            type="number"
                            min={1}
                            max={6}
                            step={0.5}
                            value={subject.semesterGrades[i] ?? ""}
                            onChange={(e) =>
                              handleGradeChange(subjectIndex, "semester", i, e.target.value)
                            }
                            className="h-8 w-16 text-center bg-secondary"
                          />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <TableCell key={`exam-${i}`} className="p-1">
                        {subject.examGrades[i] !== undefined ? (
                          <Input
                            type="number"
                            min={1}
                            max={6}
                            step={0.5}
                            value={subject.examGrades[i] ?? ""}
                            onChange={(e) =>
                              handleGradeChange(subjectIndex, "exam", i, e.target.value)
                            }
                            className="h-8 w-16 text-center bg-primary/10"
                          />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium">
                      {results.subjects[subjectIndex].finalGrade?.toFixed(1) || "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bestehungsnormen schulischer Teil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <span>Gesamtnote (Durchschnitt mindestens 4.0):</span>
                      <span className={`font-medium ${results.overallAverage >= 4.0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.overallAverage.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ungenügende Fachnoten (maximal 2):</span>
                      <span className={`font-medium ${results.failingGrades <= 2 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.failingGrades}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Notenabweichung unter 4.0:</span>
                      <span className={`font-medium ${results.maxDeviation <= 2.0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.maxDeviation.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resultat</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert variant={results.hasPassed ? "default" : "destructive"} className="border-2">
                    {results.hasPassed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <AlertTitle className="text-lg">
                      {results.hasPassed ? "Bestanden" : "Nicht bestanden"}
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      {results.hasPassed
                        ? "Herzlichen Glückwunsch! Sie haben die Berufsmaturität bestanden."
                        : "Die Anforderungen für die Berufsmaturität wurden leider nicht erfüllt."}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

