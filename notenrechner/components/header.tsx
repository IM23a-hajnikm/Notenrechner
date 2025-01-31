"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Moon, Sun, User } from 'lucide-react'
import Link from "next/link"
import { useTheme } from "next-themes"
import { AuthPopup } from "@/components/auth-popup"
import { useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        <nav className="flex items-center space-x-4 lg:space-x-6 mr-4">
          <Link
            href="/berufsmaturitaet"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Berufsmaturität
          </Link>
          <Link
            href="/efz"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            EFZ
          </Link>
          <Link
            href="/semesternoten"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Semesternoten
          </Link>
        </nav>
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Suche..."
            className="md:w-[300px] lg:w-[400px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Link href="https://github.com/IM23a-hajnikm" target="_blank">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsAuthOpen(true)}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <AuthPopup />
    </header>
  )
}

