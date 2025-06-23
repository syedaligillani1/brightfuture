'use client';
import React, { useState, useEffect, Suspense } from "react";
import { DollarSign, Users, BookOpen, GraduationCap, MoreVertical } from 'lucide-react';
import Card from '../components/Card';
import data from '../components/data.json';
import RevenueChart from '../components/RevenueChart';
import OverviewChart from '../components/Overview';
import UniversitiesTable from "./UniversitiesTable";
import { useRouter, useSearchParams } from "next/navigation";
import { universityColumns, universityData, University } from "./data";

// Icon mapping for type safety
const iconMap: Record<string, React.ComponentType<any>> = {
  DollarSign,
  Users,
  BookOpen,
  GraduationCap,
};

// Example data for the summary cards
const summaryCards = [
  { title: "Total revenue", value: "KD 53,00989" },
  { title: "Installment Pending KD", value: "KD 5,000" },
  { title: "Institute share Percentage", value: "KD 4,000" },
  { title: "Instructor share Percentage", value: "KD 5,000" },
];

// Example data for PieChart
const pieData = [
  { name: "Courses", value: 567 },
  { name: "Instructors", value: 1098 },
  { name: "Total Students", value: 900 },
  { name: "Enrolled Students", value: 900 },
];

// Example filter options
const universityOptions = ["All Universities", "AUK", "AUM", "FAST"];
const departmentOptions = ["All Departments", "Electrical", "Chemical", "CS"];
const dateRangeOptions = ["Last 30 days", "This Month", "Last Month"];

function UniversitiesPageContent() {
  const [filters, setFilters] = useState({
    university: universityOptions[0],
    department: departmentOptions[0],
    dateRange: dateRangeOptions[0],
  });
  const [tableRows, setTableRows] = useState<University[]>(universityData);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = universityData.filter((u) =>
      u.name.toLowerCase().includes(lowercasedQuery)
    );
    setTableRows(filtered);
  };

  useEffect(() => {
    const editedName = searchParams.get('editedName');
    if (editedName) {
      const updatedUniversity = universityData.find(u => u.name === editedName);
      if (updatedUniversity) {
        setTableRows(prevRows => prevRows.map(row => row.name === editedName ? updatedUniversity : row));
      }
    }
  }, [searchParams]);

  const handleEdit = (university: any) => {
    router.push(`/universities/edit/${university.name}`);
  };

  const handleDelete = (universityToDelete: any) => {
    setTableRows(tableRows.filter(u => u.name !== universityToDelete.name));
  };

  const handleView = (university: any) => {
    router.push(`/universities/view/${university.name}`);
  };

  return (
    <div className="p-6 space-y-6">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {data.map((item, index) => {
    const IconComponent = iconMap[item.icon] || DollarSign; // Fallback to DollarSign if icon not found

    return (
      <Card
        key={index}
        icon={
          <div className={`p-3 rounded-full ${item.color}`}>
            <IconComponent size={20} className="text-white" />
          </div>
        }
        label={item.label}
        amount={item.amount}
        sales={item.sales}
      />
    );
  })}
</div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <div className="h-[400px] bg-white rounded-xl shadow p-6">
          <RevenueChart />
        </div>
        <div className="bg-white rounded-xl shadow p-6 h-full">
          <OverviewChart />
        </div>
      </div>

<UniversitiesTable
  columns={universityColumns}
  data={tableRows}
  tabs={["All Universities", "Active Universities", "Inactive Universities"]}
  searchPlaceholder="Search University by name, category"
  onSearch={handleSearch}
  renderRow={(u, i) => (
    <tr key={i} className="border-t">
      <td className="p-2">{u.name}</td>
      <td>{u.departments}</td>
      <td>{u.instructors}</td>
      <td>{u.courses}</td>
      <td>{u.totalStudents}</td>
      <td>{u.enrolledStudents}</td>
      <td>
        <span className={`px-2 py-1 rounded text-xs ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {u.status}
        </span>
      </td>
      <td className="relative">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="m-1 cursor-pointer"> <MoreVertical size={16} /></label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 z-50">
            <li><a onClick={() => handleEdit(u)}>Edit</a></li>
            <li><a onClick={() => handleDelete(u)}>Delete</a></li>
            <li><a onClick={() => handleView(u)}>View</a></li>
          </ul>
        </div>
      </td>
    </tr>
  )}
onAddNew={() => router.push('/universities/add')}/>
 
      
</div>
  )
}

export default function Universities() {
    return (
        <UniversitiesPageContent />
    )
}