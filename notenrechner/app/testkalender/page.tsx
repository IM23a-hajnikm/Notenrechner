"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Test = {
  id: number
  subject: string
  date: string
  time: string
}

const mockTests: Test[] = [
  { id: 1, subject: "Mathematik", date: "2024-03-15", time: "10:00" },
  { id: 2, subject: "Deutsch", date: "2024-03-17", time: "14:00" },
  { id: 3, subject: "Englisch", date: "2024-03-20", time: "09:00" },
  { id: 4, subject: "Geschichte", date: "2024-03-22", time: "11:00" },
  { id: 5, subject: "Biologie", date: "2024-04-05", time: "13:30" },
]

export default function TestkalenderPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const filterTests = (tests: Test[], period: string) => {
    const today = new Date()
    const endDate = new Date()

    switch (period) {
      case "week":
        endDate.setDate(today.getDate() + 7)
        break
      case "month":
        endDate.setMonth(today.getMonth() + 1)
        break
      case "semester":
        endDate.setMonth(today.getMonth() + 6)
        break
      default:
        return tests
    }

    return tests.filter(test => {
      const testDate = new Date(test.date)
      return testDate >= today && testDate <= endDate
    })
  }

  const filteredTests = filterTests(mockTests, selectedPeriod)

  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle>Testkalender</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setSelectedPeriod} defaultValue={selectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zeitraum wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Diese Woche</SelectItem>
                <SelectItem value="month">Diesen Monat</SelectItem>
                <SelectItem value="semester">Dieses Semester</SelectItem>
              </SelectContent>
            </Select>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fach</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Uhrzeit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell>{test.subject}</TableCell>
                    <TableCell>{new Date(test.date).toLocaleDateString('de-CH')}</TableCell>
                    <TableCell>{test.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

