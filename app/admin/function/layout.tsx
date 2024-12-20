import { cookies } from "next/headers";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashBoard } from "../../../components/ui/app-sidebar";

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
