// app/(dashboard)/layout.tsx
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children, // `children` akan berisi konten dari setiap halaman (page.tsx)
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="[--header-height:calc(--spacing(14))] bg-background text-foreground">
      <SidebarProvider className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            {children}
            <Toaster richColors position="top-center" expand={false} />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
