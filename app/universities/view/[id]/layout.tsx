"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, Bell, ChevronDown } from "lucide-react";

export default function ViewUniversityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const tabs = [
    {
      name: "General Info",
      path: `/universities/view/${params.id}`,
    },
    {
      name: "Departments",
      path: `/universities/view/${params.id}/departments`,
    },
    {
      name: "Categories",
      path: `/universities/view/${params.id}/categories`,
    },
    {
      name: "Student",
      path: `/universities/view/${params.id}/students`,
    },
    { name: "Courses", path: `/universities/view/${params.id}/courses` },
    { name: "Stories", path: `/universities/view/${params.id}/stories` },
    { name: "Banners", path: `/universities/view/${params.id}/banners` },
    { name: "Semesters", path: `/universities/view/${params.id}/semesters` },
    {
      name: "Installment Plan",
      path: `/universities/view/${params.id}/installment`,
    },
    { name: "Coupons", path: `/universities/view/${params.id}/coupons` },
  ];
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-6">
        <div className="flex items-center gap-2">
          <Link
            href="/universities"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="text-xl font-semibold">Universities</div>
          <div className="text-xl text-gray-400">/</div>
          <div className="text-xl text-gray-400">View University</div>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0" />
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 rounded-full border p-1 pr-2 hover:bg-gray-100 cursor-pointer">
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
            />
            <span className="text-sm font-medium">Alex Meian</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </header>
      <main className="p-6 bg-gray-50">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">University Name Here</h1>
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  href={tab.path}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4">{children}</div>
        </div>
      </main>
    </>
  );
} 