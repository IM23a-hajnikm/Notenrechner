"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SemesterPrognose } from "@/components/prognose/semester-prognose"
import { EFZPrognose } from "@/components/prognose/efz-prognose"
import { BerufsmaturitaetPrognose } from "@/components/prognose/berufsmaturitaet-prognose"

export default function PrognosePage() {
  return (
    <div className="container py-6">
      <Card>
        <CardHeader>
          <CardTitle>Prognose</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="semester">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="semester">Semester</TabsTrigger>
              <TabsTrigger value="efz">EFZ</TabsTrigger>
              <TabsTrigger value="berufsmaturitaet">Berufsmaturität</TabsTrigger>
            </TabsList>
            <TabsContent value="semester">
              <SemesterPrognose />
            </TabsContent>
            <TabsContent value="efz">
              <EFZPrognose />
            </TabsContent>
            <TabsContent value="berufsmaturitaet">
              <BerufsmaturitaetPrognose />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

