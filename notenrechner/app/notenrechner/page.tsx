"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function NotenrechnerPage() {
  const [points, setPoints] = useState("")
  const [maxPoints, setMaxPoints] = useState("")
  const [grade, setGrade] = useState<number | null>(null)

  const calculateGrade = () => {
    const earnedPoints = parseFloat(points)
    const totalPoints = parseFloat(maxPoints)
    
    if (isNaN(earnedPoints) || isNaN(totalPoints) || totalPoints === 0) {
      setGrade(null)
      return
    }

    const percentage = (earnedPoints / totalPoints) * 100
    let calculatedGrade

    if (percentage >= 95) calculatedGrade = 6
    else if (percentage >= 85) calculatedGrade = 5.5
    else if (percentage >= 75) calculatedGrade = 5
    else if (percentage >= 65) calculatedGrade = 4.5
    else if (percentage >= 55) calculatedGrade = 4
    else if (percentage >= 45) calculatedGrade = 3.5
    else if (percentage >= 35) calculatedGrade = 3
    else if (percentage >= 25) calculatedGrade = 2.5
    else if (percentage >= 15) calculatedGrade = 2
    else calculatedGrade = 1

    setGrade(calculatedGrade)
  }

  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle>Notenrechner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="points">Erreichte Punkte</Label>
                <Input
                  id="points"
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="z.B. 42"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPoints">Maximale Punkte</Label>
                <Input
                  id="maxPoints"
                  type="number"
                  value={maxPoints}
                  onChange={(e) => setMaxPoints(e.target.value)}
                  placeholder="z.B. 50"
                />
              </div>
            </div>
            <Button onClick={calculateGrade}>Note berechnen</Button>
            {grade !== null && (
              <div className="mt-4">
                <p className="text-lg font-semibold">
                  Berechnete Note: <span className="text-primary">{grade.toFixed(1)}</span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

