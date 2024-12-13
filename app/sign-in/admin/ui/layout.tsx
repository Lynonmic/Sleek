import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "./sidebar";
import { DashBoard } from "./sidebar-tab";

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashBoard />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
