'use client';
import { useRouter } from 'next/navigation';
import Card from '../utility/Card';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';
import Modal from '@/app/components/Modal';
import { useState } from 'react';

export default function CoursesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <PrimaryButton 
          label="Add Course" 
          onClick={() => setModalOpen(true)} 
          type="button"
        />
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Course"
        description="You clicked Add Course button"
        confirmLabel="OK"
        cancelLabel=""
        onConfirm={() => setModalOpen(false)}
      />

      <Card
        title="Courses Management"
        subtitle="Manage university courses and curriculum"
        variant="elevated"
      >
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Courses Management</h3>
            <p className="text-gray-600 mb-6">
              This page will contain comprehensive courses management functionality including:
            </p>
            <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
              <li>• Create and manage course catalog</li>
              <li>• Assign instructors to courses</li>
              <li>• Manage course schedules</li>
              <li>• Track course enrollments</li>
              <li>• Handle course materials</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <CancelButton 
                label="Back to Universities" 
                onClick={() => router.push('/universities')} 
                type="button"
              />
              <PrimaryButton 
                label="Go to Settings" 
                onClick={() => router.push('/settings')} 
                type="button"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
