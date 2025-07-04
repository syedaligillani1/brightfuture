"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function ViewUniversityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const mainTabs = [
    { name: "General Info", path: `/universities/view/${params.id}` },
    { name: "Departments", path: `/universities/view/${params.id}/departments` },
    { name: "Categories", path: `/universities/view/${params.id}/categories` },
    { name: "Student", path: `/universities/view/${params.id}/students` },
    { name: "Courses", path: `/universities/view/${params.id}/courses` }
  ];

  const secondaryTabs = [
    { name: "Stories", path: `/universities/view/${params.id}/stories` },
    { name: "Banners", path: `/universities/view/${params.id}/banners` },
    { name: "Semesters", path: `/universities/view/${params.id}/semesters` },
    { name: "Installment Plan", path: `/universities/view/${params.id}/installment` },
    { name: "Coupons", path: `/universities/view/${params.id}/coupons` }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-4 py-3 flex items-center gap-2">
          <Link
            href="/universities"
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span>Universities</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">View University</span>
          </div>
        </div>
      </header>

      <main className="p-4">
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">University Name Here</h1>
          
          {/* Primary Navigation */}
          <div className="flex flex-wrap gap-2">
            {mainTabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  href={tab.path}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  style={isActive ? { backgroundColor: '#094e85' } : {}}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="flex flex-wrap gap-2">
            {secondaryTabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  href={tab.path}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  style={isActive ? { backgroundColor: '#094e85' } : {}}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>

          {/* Content */}
          <div className="pt-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
} 