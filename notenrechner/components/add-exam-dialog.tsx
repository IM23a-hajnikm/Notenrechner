"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Lecture } from "@/types/semester"

const subjects = [
  { value: "M", label: "Mathematik" },
  { value: "D", label: "Deutsch" },
  { value: "GuP", label: "Geschichte und Politik" },
  { value: "E", label: "Englisch" },
  { value: "WR", label: "Wirtschaft und Recht" },
  { value: "Frw", label: "Französisch" },
  { value: "TuU", label: "Technik und Umwelt" },
  { value: "M320", label: "Modul 320" },
  { value: "M294", label: "Modul 294" },
]

const formSchema = z.object({
  date: z.string().min(1, "Datum ist erforderlich"),
  startTime: z.string().min(1, "Startzeit ist erforderlich"),
  endTime: z.string().min(1, "Endzeit ist erforderlich"),
  subject: z.string().min(1, "Fach ist erforderlich"),
  teacher: z.string().min(1, "Lehrperson ist erforderlich"),
  class: z.string().min(1, "Klasse ist erforderlich"),
  room: z.string().min(1, "Raum ist erforderlich"),
  title: z.string(),
})

interface AddExamDialogProps {
  onAddExam: (exam: Partial<Lecture>) => void
}

export function AddExamDialog({ onAddExam }: AddExamDialogProps) {
  const [open, setOpen] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      startTime: "",
      endTime: "",
      subject: "",
      teacher: "",
      class: "",
      room: "",
      title: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dateParts = new Date(values.date).toLocaleDateString('de-CH').split('.')
    const weekNumber = getWeekNumber(new Date(values.date))
    
    const newExam: Partial<Lecture> = {
      week: weekNumber,
      date: `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`,
      day: new Date(values.date).toLocaleDateString('de-DE', { weekday: 'long' }),
      startTime: values.startTime,
      endTime: values.endTime,
      subject: values.subject,
      teacher: values.teacher,
      class: values.class,
      room: values.room,
      title: values.title,
    }

    onAddExam(newExam)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Prüfung hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Neue Prüfung hinzufügen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datum</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Startzeit</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endzeit</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fach</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wähle ein Fach" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lehrperson</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klasse</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raum</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Hinzufügen</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

