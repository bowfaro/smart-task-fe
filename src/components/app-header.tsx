import * as React from "react"
import { ChevronDown, LogOut, Search } from "lucide-react"

import { logoutAction } from "@/lib/actions/auth.action"
import { getMeApi } from "@/lib/apis/auth.api"
import { cn } from "@/lib/utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/sperator"
import { SidebarTrigger } from "@/components/ui/sidebar"

type MeUser = Awaited<ReturnType<typeof getMeApi>>

const fallbackUser: MeUser = {
  id: "",
  name: "",
  email: "",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export async function AppHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  let user = fallbackUser

  try {
    user = await getMeApi()
  } catch {
    user = fallbackUser
  }

  return (
    <header
      className={cn(
        "flex h-12 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 h-4" />
      </div>

      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="relative max-w-xl flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="h-9 border-muted-foreground/20 bg-muted/30 pl-9 shadow-none"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 rounded-full px-2.5">
              <Avatar className="size-8">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <span className="hidden flex-col items-start leading-none md:flex">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-muted-foreground text-xs">{user.email}</span>
              </span>
              <ChevronDown className="text-muted-foreground size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-muted-foreground text-xs">{user.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <DropdownMenuItem asChild variant="destructive">
                <button type="submit" className="w-full cursor-pointer">
                  <LogOut />
                  <span>Logout</span>
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}