import { BreadCrumbComponent } from "@/components/bread-crumb/bread-crumb";
import { SideNav } from "@/components/dashboard/side-nav";
import { Welcome } from "@/components/dashboard/welcome";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen">
      <div className="grid md:grid-cols-[auto_1fr] h-screen ">
        <div className="shadow-lg w-full h-full">
          <SideNav />
        </div>
        <main className="min-h-screen overflow-auto">
          <div className="py-12 px-4 md:px-8">
            <Welcome />
            <BreadCrumbComponent />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
