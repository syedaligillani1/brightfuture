'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { universityData, University } from '../../data';
import Button from '../../../utility/Button';
import Card from '../../../utility/Card';
import Tabs from '../../../utility/Tabs';

type TabType = 'general' | 'departments' | 'instructors' | 'students' | 'courses' | 'settings';

export default function EditUniversityPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [university, setUniversity] = useState<University | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('general');

  useEffect(() => {
    const universityName = decodeURIComponent(params.id);
    const foundUniversity = universityData.find(u => u.name === universityName);
    if (foundUniversity) {
      setUniversity(foundUniversity);
    }
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (university) {
      setUniversity({ ...university, [e.target.name]: e.target.value });
    }
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (university) {
      // Here you would typically save to a backend.
      // For now, we'll just navigate back with a query param to trigger a refresh.
      const originalName = decodeURIComponent(params.id);
      // This is a mock update. In a real app, you'd get the updated data from a backend.
      // We are modifying the mock data directly here for demonstration.
      const index = universityData.findIndex(u => u.name === originalName);
      if(index !== -1) {
        universityData[index] = university;
      }
      
      router.push(`/universities?editedName=${encodeURIComponent(university.name)}`);
    }
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey as TabType);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <form onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" id="name" name="name" value={university?.name || ''} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="deviceLimit" className="block text-sm font-medium text-gray-700 mb-1">Device Limit</label>
                <select id="deviceLimit" name="departments" value={university?.departments || ''} onChange={handleInputChange} className="w-full border-gray-300 rounded-md shadow-sm">
                  <option>5</option>
                  <option>8</option>
                  <option>10</option>
                  <option>12</option>
                  <option>15</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <p className="block text-sm font-medium text-gray-700 mb-1">University Logo</p>
              <div className="flex items-center gap-4">
                <div className="w-1/2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <p className="text-gray-500">Upload Logo</p>
                </div>
                <div className="w-1/2 flex justify-center">
                  <img src="/logo.png" alt="logo" className="h-24 w-24" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button 
                label="Cancel" 
                variant="secondary" 
                onClick={() => router.back()} 
              />
              <Button 
                label="Save Changes" 
                variant="primary" 
                type="submit" 
              />
            </div>
          </form>
        );
      case 'departments':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Departments Management</h3>
            <p className="text-gray-600 mb-4">This page will contain departments management functionality.</p>
            <Button 
              label="Go to Departments" 
              variant="primary" 
              onClick={() => router.push('/departments')} 
            />
          </div>
        );
      case 'instructors':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Instructors Management</h3>
            <p className="text-gray-600 mb-4">This page will contain instructors management functionality.</p>
            <Button 
              label="Go to Instructors" 
              variant="primary" 
              onClick={() => router.push('/instructors')} 
            />
          </div>
        );
      case 'students':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Students Management</h3>
            <p className="text-gray-600 mb-4">This page will contain students management functionality.</p>
            <Button 
              label="Go to Students" 
              variant="primary" 
              onClick={() => router.push('/students')} 
            />
          </div>
        );
      case 'courses':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Courses Management</h3>
            <p className="text-gray-600 mb-4">This page will contain courses management functionality.</p>
            <Button 
              label="Go to Courses" 
              variant="primary" 
              onClick={() => router.push('/courses')} 
            />
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">University Settings</h3>
            <p className="text-gray-600 mb-4">This page will contain university settings and configuration.</p>
            <Button 
              label="Go to Settings" 
              variant="primary" 
              onClick={() => router.push('/settings')} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!university) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { key: 'general', label: 'General Info' },
    { key: 'departments', label: 'Departments' },
    { key: 'instructors', label: 'Instructors' },
    { key: 'students', label: 'Students' },
    { key: 'courses', label: 'Courses' },
    { key: 'settings', label: 'Settings' }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Universities / <span className="text-gray-500">Edit University</span></h1>
      
      <Card
        title="Edit University"
        variant="elevated"
        headerActions={
          <div className="flex items-center">
            <span className="mr-2">Status</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="status" checked={university.status === 'Active'} onChange={(e) => {
                  if (university) {
                    setUniversity({ ...university, status: e.target.checked ? 'Active' : 'Inactive' });
                  }
              }} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        }
      >
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          variant="default"
          className="mb-6"
        />
        
        {renderTabContent()}
      </Card>
    </div>
  );
} 