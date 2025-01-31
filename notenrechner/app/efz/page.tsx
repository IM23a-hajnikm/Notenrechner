"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from 'lucide-react'
import { Module, EFZCalculation } from "@/types/efz"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const initialModules: Module[] = [
  // Berufliche Informatikkompetenzen
  { number: "443", name: "Aufträge im eigenen Berufsfeld selbstständig durchführen", grade: null, category: "competencies" },
  { number: "117", name: "Informatik- und Netzinfrastruktur für ein kleines ÜK realisieren", grade: null, category: "competencies" },
  { number: "319", name: "Applikationen entwerfen und implementieren", grade: null, category: "competencies" },
  { number: "162", name: "Daten analysieren und modellieren", grade: null, category: "competencies" },
  { number: "114", name: "Codierungs-, Kompressions- und Verschlüsselungsverfahren einsetzen", grade: null, category: "competencies" },
  { number: "164", name: "Datenbanken erstellen und Daten einfügen", grade: null, category: "competencies" },
  { number: "243", name: "Webauftritt erstellen und veröffentlichen", grade: null, category: "competencies" },
  { number: "231", name: "Datenschutz und Datensicherheit anwenden", grade: null, category: "competencies" },
  { number: "320", name: "Objektorientiert programmieren", grade: null, category: "competencies" },
  { number: "165", name: "NoSQL-Datenbanken einsetzen", grade: null, category: "competencies" },
  { number: "322", name: "Benutzerschnittstellen entwerfen und implementieren", grade: null, category: "competencies" },
  { number: "122", name: "Abläufe mit einer Scriptsprache automatisieren", grade: null, category: "competencies" },
  { number: "254", name: "Geschäftsprozesse im eigenen Berufsfeld beschreiben", grade: null, category: "competencies" },
  { number: "346", name: "Cloud Lösungen konzipieren und realisieren", grade: null, category: "competencies" },
  { number: "426", name: "Software mit agilen Methoden entwickeln", grade: null, category: "competencies" },
  { number: "347", name: "Dienst mit Container anwenden", grade: null, category: "competencies" },
  { number: "323", name: "Funktional programmieren", grade: null, category: "competencies" },
  { number: "450", name: "Applikationen testen", grade: null, category: "competencies" },
  { number: "306", name: "Kleinprojekte im eigenen Berufsfeld abwickeln", grade: null, category: "competencies" },
  { number: "183", name: "Applikationssicherheit implementieren", grade: null, category: "competencies" },
  { number: "324", name: "DevOps-Prozesse mit Tools unterstützen", grade: null, category: "competencies" },
  { number: "321", name: "Verteilte Systeme programmieren", grade: null, category: "competencies" },
  { number: "241", name: "Innovative ICT-Lösungen initialisieren", grade: null, category: "competencies" },
  { number: "245", name: "Innovative ICT-Lösungen umsetzen", grade: null, category: "competencies" },
  
  // Überbetriebliche Kurse (ÜK)
  { number: "187", name: "ICT-Arbeitsplatz mit Betriebssystem in Betrieb nehmen", grade: null, category: "uk" },
  { number: "106", name: "Datenbanken abfragen, bearbeiten und warten", grade: null, category: "uk" },
  { number: "294", name: "Frontend einer interaktiven Webapplikation realisieren", grade: null, category: "uk" },
  { number: "295", name: "Backend für Applikationen realisieren", grade: null, category: "uk" },
  { number: "210", name: "Public Cloud für Anwendungen nutzen", grade: null, category: "uk" },
  { number: "355", name: "Mobile-Applikationen realisieren", grade: null, category: "uk" },
  { number: "223", name: "Multi-User Applikationen objektorientiert realisieren", grade: null, category: "uk" },
  
  // IPA
  { number: "IPA", name: "Facharbeit IPA", grade: null, category: "ipa" },
]

function calculateResults(modules: Module[]): EFZCalculation {
  const competenciesModules = modules.filter(m => m.category === "competencies" && m.grade !== null)
  const ukModules = modules.filter(m => m.category === "uk" && m.grade !== null)
  const ipaModule = modules.find(m => m.category === "ipa")

  const competenciesAverage = competenciesModules.length > 0
    ? Number((competenciesModules.reduce((sum, m) => sum + (m.grade || 0), 0) / competenciesModules.length).toFixed(1))
    : 0

  const ukAverage = ukModules.length > 0
    ? Number((ukModules.reduce((sum, m) => sum + (m.grade || 0), 0) / ukModules.length).toFixed(1))
    : 0

  const ipaGrade = ipaModule?.grade || 0

  // Passing criteria:
  // - All averages must be >= 4.0
  // - No more than 2 modules below 4.0
  const hasPassed = 
    competenciesAverage >= 4.0 &&
    ukAverage >= 4.0 &&
    ipaGrade >= 4.0 &&
    modules.filter(m => m.grade !== null && m.grade < 4.0).length <= 2

  return {
    competenciesAverage,
    ukAverage,
    ipaGrade,
    hasPassed
  }
}

export default function EFZPage() {
  const [modules, setModules] = useState<Module[]>(initialModules)
  const results = calculateResults(modules)

  const handleGradeChange = (moduleNumber: string, value: string) => {
    const newValue = value === "" ? null : Number(value)
    if (newValue !== null && (newValue < 1 || newValue > 6)) return

    setModules(prev => prev.map(module => 
      module.number === moduleNumber 
        ? { ...module, grade: newValue }
        : module
    ))
  }

  const renderModuleTable = (category: 'competencies' | 'uk' | 'ipa') => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Modul-Nr.</TableHead>
          <TableHead>Modulbezeichnung</TableHead>
          <TableHead className="w-[120px]">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules
          .filter(m => m.category === category)
          .map(module => (
            <TableRow key={module.number}>
              <TableCell className="font-mono">{module.number}</TableCell>
              <TableCell>{module.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  step={0.1}
                  value={module.grade ?? ""}
                  onChange={(e) => handleGradeChange(module.number, e.target.value)}
                  className="w-20 h-8 text-center bg-secondary"
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>EFZ Notenrechner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="competencies">
                <AccordionTrigger>Berufliche Informatikkompetenzen</AccordionTrigger>
                <AccordionContent>
                  {renderModuleTable('competencies')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="uk">
                <AccordionTrigger>Überbetriebliche Kurse (ÜK)</AccordionTrigger>
                <AccordionContent>
                  {renderModuleTable('uk')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ipa">
                <AccordionTrigger>IPA</AccordionTrigger>
                <AccordionContent>
                  {renderModuleTable('ipa')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Durchschnitte</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <span>Berufliche Informatikkompetenzen:</span>
                      <span className={`font-medium ${
                        results.competenciesAverage >= 4.0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {results.competenciesAverage.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Überbetriebliche Kurse:</span>
                      <span className={`font-medium ${
                        results.ukAverage >= 4.0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {results.ukAverage.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>IPA:</span>
                      <span className={`font-medium ${
                        results.ipaGrade >= 4.0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {results.ipaGrade.toFixed(1)}
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
                        ? "Herzlichen Glückwunsch! Sie haben das EFZ bestanden."
                        : "Die Anforderungen für das EFZ wurden leider nicht erfüllt."}
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

