import { BreadCrumbComponent } from "@/components/bread-crumb/bread-crumb";
import { NavBar } from "@/components/dashboard/nav-bar";
import { Welcome } from "@/components/dashboard/welcome";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen ">
      <div className="grid md:grid-cols-[auto_1fr] h-screen ">
        <div className="shadow-lg w-full h-full">
          <NavBar />
        </div>
        <main className="min-h-screen overflow-auto py-12 px-4 md:px-8">
          <Welcome />
          <BreadCrumbComponent />
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
