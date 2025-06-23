'use client';
import { useRouter } from 'next/navigation';
import Card from '../utility/Card';
import Button from '../utility/Button';

export default function DepartmentsPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Departments</h1>
        <Button 
          label="Add Department" 
          variant="primary" 
          onClick={() => alert('Add Department functionality will be implemented here')} 
        />
      </div>

      <Card
        title="Departments Management"
        subtitle="Manage university departments and their configurations"
        variant="elevated"
      >
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Departments Management</h3>
            <p className="text-gray-600 mb-6">
              This page will contain comprehensive departments management functionality including:
            </p>
            <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
              <li>• Create and manage departments</li>
              <li>• Assign instructors to departments</li>
              <li>• Configure department settings</li>
              <li>• View department statistics</li>
              <li>• Manage department resources</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <Button 
                label="Back to Universities" 
                variant="secondary" 
                onClick={() => router.push('/universities')} 
              />
              <Button 
                label="Go to Instructors" 
                variant="primary" 
                onClick={() => router.push('/instructors')} 
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
