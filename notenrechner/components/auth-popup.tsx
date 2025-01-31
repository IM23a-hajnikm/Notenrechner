"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthPopup() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Konto</DialogTitle>
          <DialogDescription>
            Melden Sie sich an oder erstellen Sie ein neues Konto.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Anmelden</TabsTrigger>
            <TabsTrigger value="register">Registrieren</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Anmelden</Button>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">E-Mail</Label>
                <Input id="register-email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Passwort</Label>
                <Input id="register-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Registrieren</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

