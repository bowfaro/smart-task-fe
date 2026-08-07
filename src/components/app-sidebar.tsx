"use client"

import * as React from "react"
import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconInnerShadowTop,
  IconCalendar,
  IconSearch,
  IconSettings,
  IconLayoutKanban,

} from "@tabler/icons-react"

import { NavTags } from "@/components/nav-tags"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Kanban",
      url: "#",
      icon: IconLayoutKanban,
    },
    {
      title: "Schedule",
      url: "#",
      icon: IconCalendar,
    },
    // {title:"Settings", url:"#", icon:IconSettings},
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  
  tags: [
    {
      name: "Data Library",
      url: "#",
      color: '#f97316',
    },
    {
      name: "Reports",
      url: "#",
      color: '#3b82f6',
    },
    {
      name: "Word Assistant",
      url: "#",
      color: '#10b981',
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3 mt-8"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-10" />
                <span className="text-base font-semibold text-xl">Smart Tasks</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTags items={data.tags} />
      </SidebarContent>
    </Sidebar>
  )
}