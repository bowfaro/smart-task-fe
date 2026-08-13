"use client"

import * as React from "react"
import {
  IconDashboard,
  IconInnerShadowTop,
  IconCalendar,
  IconLayoutKanban,
  IconListDetails,

} from "@tabler/icons-react"

import { NavTags } from "@/components/nav-tags"
import { NavMain } from "@/components/nav-main"
import { Link } from "@/i18n/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: IconDashboard,
    },
    {
      title: "Kanban",
      url: "/kanban",
      icon: IconLayoutKanban,
    },
    {
      title: "Tasks manager",
      url: "/tasks",
      icon: IconListDetails,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: IconCalendar,
    },
  ],
  
  tags: [
   
  ],
}

export function AppSidebar({ tags = [], ...props }: React.ComponentProps<typeof Sidebar> & { tags?: any[] }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3 mt-8"
            >
              <Link href="/overview">
                <IconInnerShadowTop className="!size-10" />
                <span className="text-base font-semibold text-xl">Smart Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTags items={tags} />
      </SidebarContent>
    </Sidebar>
  )
}