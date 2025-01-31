"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, FileText, Calculator, Settings, LogOut, Calendar, TrendingUp } from 'lucide-react'

const menuItems = [
  {
    href: "/dashboard",
    icon: LayoutGrid,
    label: "Dashboard"
  },
  {
    href: "/berufsmaturitaet",
    icon: FileText,
    label: "Berufsmaturität"
  },
  {
    href: "/efz",
    icon: Calculator,
    label: "EFZ"
  },
  {
    href: "/semesternoten",
    icon: FileText,
    label: "Semesternoten"
  },
  {
    href: "/frontend",
    icon: Calculator,
    label: "Notenrechner"
  },
  {
    href: "/testkalender",
    icon: Calendar,
    label: "Testkalender"
  },
  {
    href: "/prognose",
    icon: TrendingUp,
    label: "Prognose"
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
      <div className="flex flex-col h-full w-[250px] border-r bg-background px-3 py-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/logo.png"
                alt="Web Notenrechner Logo"
                width={40}
                height={40}
            />
            <span className="font-semibold">Web Notenrechner</span>
          </Link>
        </div>
        <div className="space-y-4 flex-1">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Menu
            </h2>
            <div className="space-y-1">
              {menuItems.map((item) => (
                  <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:text-primary",
                          pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/80"
                      )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto space-y-4">
          <Link
              href="/settings"
              className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:text-primary",
                  pathname === "/settings" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-secondary/80"
              )}
          >
            <Settings className="h-4 w-4" />
            Einstellungen
          </Link>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </div>
  )
}

