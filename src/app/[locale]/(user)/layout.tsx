import type { ReactNode } from "react"

import { AppHeader } from "@/components/app-header"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { getTagsApi } from "@/lib/apis/tags.api"

export default async function UserLayout({ children }: { children: ReactNode }) {
  let tags = []
  try {
    const res: any = await getTagsApi()
    if (Array.isArray(res)) {
      tags = res
    } else if (res && Array.isArray(res.items)) {
      tags = res.items
    } else {
      tags = []
    }
  } catch (error) {
    console.error("Failed to fetch tags", error)
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar tags={tags} />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-6 md:pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}