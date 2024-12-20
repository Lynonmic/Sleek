"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarMenuAction,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TopElement } from "../../app/admin/function/UserManagerment";
import { TableUser } from "../../app/admin/function/TableUser";
import { TableGame } from "../../app/admin/function/TableGame";
import { TableType } from "../../app/admin/function/TableGameType";
import { TableOrder } from "@/app/admin/function/TableOrder";
import { TableOrderDetail } from "@/app/admin/function/TableOrderDetail";

// Menu items.
const items = [
  {
    title: "Game",
    component: (
      <div className="w-full max-w-full">
        <TableGame />
      </div>
    ),
    icon: Home,
  },
  {
    title: "User",
    component: (
      <div className="w-full max-w-full">
        <TableUser />
      </div>
    ),
    icon: Inbox,
  },
  {
    title: "Game type",
    component: (
      <div className="w-full max-w-full">
        <TopElement className="w-full" />
        <TableType />
      </div>
    ),
    icon: Calendar,
  },
  {
    title: "Order",
    component: (
      <div className="w-full max-w-full">
        <TopElement className="w-full" />
        <TableOrder />
      </div>
    ),
    icon: Search,
  },
  {
    title: "Order detail",
    component: (
      <div className="w-full max-w-full">
        <TopElement className="w-full" />
        <TableOrderDetail />
      </div>
    ),
    icon: Search,
  },
  {
    title: "Invoices",
    component: <div>Search Content</div>,
    icon: Search,
  },
  {
    title: "FAQ",
    component: <div>Search Content</div>,
    icon: Search,
  },
  {
    title: "Settings",
    component: <div>Settings Content</div>,
    icon: Settings,
  },
];

export function DashBoard() {
  const [open, setOpen] = React.useState(true);
  const [activeTab, setActiveTab] = useState(items[0].title);

  const activeContent = items.find(
    (item) => item.title === activeTab
  )?.component;

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="relative flex w-full">
        <motion.div
          className="relative top-4 left-16 z-50"
          animate={{ x: open ? 200 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <SidebarTrigger>
            <Menu />
          </SidebarTrigger>
        </motion.div>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Select Workspace
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem>
                      <span>Acme Inc</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Acme Corp.</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeTab === item.title}
                    className=" hover:bg-primary-300 dark:hover:bg-primary-400"
                    onClick={() => setActiveTab(item.title)}
                  >
                    <div className="flex items-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                  <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
        <div className="flex-1 p-4">{activeContent}</div>
      </div>
    </SidebarProvider>
  );
}
