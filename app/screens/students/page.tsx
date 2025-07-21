'use client';
import { useRouter } from 'next/navigation';
import Card from '../utility/Card';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function StudentsPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <PrimaryButton 
          label="Add Student" 
          onClick={() => { /* add student logic */ }}
          type="button"
        />
      </div>

      <Card
        title="Students Management"
        subtitle="Manage university students and their enrollments"
        variant="elevated"
      >
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Students Management</h3>
            <p className="text-gray-600 mb-6">
              This page will contain comprehensive students management functionality including:
            </p>
            <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
              <li>• Register and manage student profiles</li>
              <li>• Handle student enrollments</li>
              <li>• Track academic progress</li>
              <li>• Manage student attendance</li>
              <li>• Generate student reports</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <CancelButton 
                label="Back to Universities" 
                onClick={() => router.push('/universities')} 
                type="button"
              />
              <PrimaryButton 
                label="Go to Courses" 
                onClick={() => router.push('/courses')} 
                type="button"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
