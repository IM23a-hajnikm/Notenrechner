import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Calendar, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex-1 p-8">
      <h1 className="text-4xl font-bold mb-6">Willkommen beim Web Notenrechner</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Wähle eine Option aus der Navigation oder nutze die Schnellzugriffe unten.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2" />
              Notenrechner
            </CardTitle>
            <CardDescription>Berechne deine Noten</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/notenrechner-frontend" className="text-primary hover:underline">
              Zum Notenrechner
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Testkalender
            </CardTitle>
            <CardDescription>Überblick über anstehende Tests</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/testkalender" className="text-primary hover:underline">
              Zum Testkalender
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Prognose
            </CardTitle>
            <CardDescription>Dein Fortschritt zum Bestehen</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/prognose" className="text-primary hover:underline">
              Zur Prognose
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

