"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Import } from 'lucide-react'

export function ImportDialog() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent, fileType: 'excel' | 'csv') => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
    const files = e.dataTransfer.files
    if (files.length > 0) {
      console.log(`Dropped ${fileType} file:`, files[0].name)
      // Add your file processing logic here
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'excel' | 'csv') => {
    const files = e.target.files
    if (files && files.length > 0) {
      console.log(`Selected ${fileType} file:`, files[0].name)
      // Add your file processing logic here
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Import className="h-4 w-4 mr-2" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Datei</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
              isDragging ? 'border-primary' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'excel')}
          >
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'excel')}
              id="excel-upload"
            />
            <label htmlFor="excel-upload" className="cursor-pointer">
              <p>Excel Datei</p>
              <p className="text-sm text-gray-500">Drag & Drop oder klicken</p>
            </label>
          </div>
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
              isDragging ? 'border-primary' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'csv')}
          >
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => handleFileSelect(e, 'csv')}
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <p>CSV Datei</p>
              <p className="text-sm text-gray-500">Drag & Drop oder klicken</p>
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

