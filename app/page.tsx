'use client';
import * as Icons from 'lucide-react';
import Card from './components/Card';
import data from './components/data.json';
import RevenueChart from './components/RevenueChart';
import OverviewChart from './components/Overview';
import InvoiceCardList from './components/InvoiceCardList';
import CouponCardList from './components/CouponCard';
import ActivityLog from './components/ActivityLog';
import TodoList from './components/TodoList';
import ScheduleCardList from './components/ScheduleCardList';
import CalendarScheduleBox from './components/CalendarScheduleBox';
import RecentActivity from './components/ActivityLog';
import Schedules from './components/ScheduleCardList';
import UniversitiesTable from './screens/universities/UniversitiesTable';
import tableData from './components/table/table.json';
import Button from './utility/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {

  const activityData = [
  { time: '08:42', title: 'ABC University', description: 'Added now' , color :'bg-blue-500' },
  { time: '10:15', title: 'John Doe', description: 'Joined class',color :'bg-pink-500' },
  { time: '12:30', title: 'Payment Received', description: 'From XYZ University' ,color :'bg-orange-500'}
]


const scheduleData = [
  { title: 'Sales Webinar', time: '10 am - 11 am' },
  { title: 'React Basics', time: '7 pm - 8 pm' },
  { title: 'Data Structures', time: '9 am' }
]

const router = useRouter();
const [activeTab, setActiveTab] = useState("All Universities");
const tabs = ["All Universities", "Active Universities", "Inactive Universities"];

const filteredData = tableData.filter((row) => {
  if (activeTab === "Active Universities") return row.status === "Paid" || row.status === "Active";
  if (activeTab === "Inactive Universities") return row.status === "Pending" || row.status === "Inactive";
  return true;
});

return (
  <div className="max-w-screen-2xl mx-auto space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {data.map((item, index) => {
        const IconComponent = Icons[item.icon as keyof typeof Icons] as React.ElementType;
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

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <div className="h-[250px] sm:h-[350px] lg:h-[400px]">
          <RevenueChart />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <div className="h-[250px] sm:h-[350px] lg:h-[400px]">
          <OverviewChart />
        </div>
      </div>
    </div>

    {/* Activity Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      <InvoiceCardList
        title="Invoices"
        items={[
          {
            name: 'Student Name 1',
            university: 'ABC University',
            id: '#123456',
            department: 'Computer Science',
            invoiceNo: 'KD 983',
            status: 'Pending'
          },
          {
            name: 'Student Name 2',
            university: 'XYZ University',
            id: '#789012',
            department: 'Accounting',
            invoiceNo: 'KD 984',
            status: 'Paid'
          },
          {
            name: 'Student Name 3',
            university: 'LMN University',
            id: '#456789',
            department: 'Business',
            invoiceNo: 'KD 985',
            status: 'Pending'
          }
        ]}
      />

      <CouponCardList
        title="Coupons"
        items={[
          { name: 'Coupon Name 1', progress: 25, total: 100 },
          { name: 'Coupon Name 2', progress: 75, total: 100 },
          { name: 'Coupon Name 3', progress: 55, total: 100 }
        ]}
      />

      <RecentActivity data={activityData} />
    </div>

    {/* Todo and Schedule */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <TodoList
        tasks={[
          { title: 'Update course schedules', date: '2025-06-18' },
          { title: 'Verify student invoices', date: '2025-06-17' },
          { title: 'Schedule webinar', date: '2025-06-20', done: true }
        ]}
      />
      <Schedules events={scheduleData} />
    </div>
  </div>
);
}
