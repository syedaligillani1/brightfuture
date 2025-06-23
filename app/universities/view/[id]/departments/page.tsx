"use client";
import { useState } from "react";
import UniversitiesTable from "@/app/universities/UniversitiesTable";
import Button from "@/app/universities/components/button/Button";
import {
  FlaskConical,
  Calculator,
  BookOpen,
  Beaker,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";

const departmentsData = [
  {
    id: 1,
    name: "Science",
    icon: <FlaskConical size={20} />,
    totalCourses: 38,
    totalInstructors: 6,
    totalStudents: 150,
    enrolledStudents: 10,
    conversion: 30,
  },
  {
    id: 2,
    name: "Math",
    icon: <Calculator size={20} />,
    totalCourses: 42,
    totalInstructors: 7,
    totalStudents: 200,
    enrolledStudents: 160,
    conversion: 30,
  },
  {
    id: 3,
    name: "English",
    icon: <BookOpen size={20} />,
    totalCourses: 56,
    totalInstructors: 9,
    totalStudents: 500,
    enrolledStudents: 350,
    conversion: 30,
  },
  {
    id: 4,
    name: "Chemical",
    icon: <Beaker size={20} />,
    totalCourses: 38,
    totalInstructors: 6,
    totalStudents: 70,
    enrolledStudents: 30,
    conversion: 30,
  },
  {
    id: 5,
    name: "Chemistry",
    icon: <GraduationCap size={20} />,
    totalCourses: 42,
    totalInstructors: 7,
    totalStudents: 60,
    enrolledStudents: 20,
    conversion: 30,
  },
];

export default function DepartmentsPage() {
  const [filteredData, setFilteredData] = useState(departmentsData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const columns = [
    "Name",
    "Total Courses",
    "Total Instructors",
    "Total Students",
    "Enrolled Students",
    "Conversion",
    "Action",
  ];

  const handleAddNew = () => {
    console.log("Add new department");
  };

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = departmentsData.filter((department) =>
      department.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
  };

  const renderRow = (department: (typeof departmentsData)[0], index: number) => {
    const isDropdownOpen = openDropdown === department.id;

    return (
      <tr
        key={department.id}
        className="border-b border-gray-100 hover:bg-gray-50"
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            {department.icon}
            <span>{department.name}</span>
          </div>
        </td>
        <td className="px-6 py-4">{department.totalCourses}</td>
        <td className="px-6 py-4">{department.totalInstructors}</td>
        <td className="px-6 py-4">{department.totalStudents}</td>
        <td className="px-6 py-4">{department.enrolledStudents}</td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-24 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-900 h-1.5 rounded-full"
                style={{ width: `${department.conversion}%` }}
              ></div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-center relative">
          <button
            onClick={() =>
              setOpenDropdown(isDropdownOpen ? null : department.id)
            }
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 border">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Delete
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View
              </a>
            </div>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Departments</h2>
        <div className="flex items-center gap-2">
          <select className="border rounded-md px-3 py-2">
            <option>Select department</option>
          </select>
          <Button label="Add New" onClick={handleAddNew} />
        </div>
      </div>
      <UniversitiesTable
        columns={columns}
        data={filteredData}
        renderRow={renderRow}
        onSearch={handleSearch}
        searchPlaceholder="Search University department"
      />
    </div>
  );
} 