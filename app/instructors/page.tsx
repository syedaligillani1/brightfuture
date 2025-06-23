'use client';
import { useRouter } from 'next/navigation';
import Card from '../utility/Card';
import Button from '../utility/Button';

export default function InstructorsPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Instructors</h1>
        <Button 
          label="Add Instructor" 
          variant="primary" 
          onClick={() => alert('Add Instructor functionality will be implemented here')} 
        />
      </div>

      <Card
        title="Instructors Management"
        subtitle="Manage university instructors and their profiles"
        variant="elevated"
      >
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructors Management</h3>
            <p className="text-gray-600 mb-6">
              This page will contain comprehensive instructors management functionality including:
            </p>
            <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
              <li>• Add and manage instructor profiles</li>
              <li>• Assign instructors to departments</li>
              <li>• Track instructor performance</li>
              <li>• Manage instructor schedules</li>
              <li>• Handle instructor permissions</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <Button 
                label="Back to Universities" 
                variant="secondary" 
                onClick={() => router.push('/universities')} 
              />
              <Button 
                label="Go to Students" 
                variant="primary" 
                onClick={() => router.push('/students')} 
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
