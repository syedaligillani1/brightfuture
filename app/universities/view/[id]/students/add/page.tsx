'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputField from '@/app/reused-Components /inputfield';
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import CancelButton from '@/app/reused-Components /CancelButton';

export default function AddStudentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const universityId = searchParams.get('universityId');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [purchaseCourses, setPurchaseCourses] = useState('');
  const [mobile, setMobile] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !department || !purchaseCourses || !mobile) {
      alert('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newStudent = {
        name,
        department,
        purchaseCourses: Number(purchaseCourses),
        mobile,
        status,
        ...(universityId ? { universityId } : {})
      };
      const url = universityId
        ? `/api/students?universityId=${encodeURIComponent(universityId)}`
        : '/api/students';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/students`);
      router.refresh();
    } catch (error) {
      alert('Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!universityId) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-500">Error: University ID is required</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-6">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <InputField
            label="Department"
            name="department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            required
          />
          <InputField
            label="Purchase Courses"
            name="purchaseCourses"
            type="number"
            value={purchaseCourses}
            onChange={e => setPurchaseCourses(e.target.value)}
            required
          />
          <InputField
            label="Mobile"
            name="mobile"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <label className="text-sm">Status:</label>
            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
              className="h-4 w-4"
              disabled={isSubmitting}
            />
            <span className="text-sm">{status ? 'Active' : 'Inactive'}</span>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <CancelButton
              label="Cancel"
              onClick={() => router.back()}
              className="px-6 py-2 text-sm"
              type="button"
              disabled={isSubmitting}
            />
            <PrimaryButton
              label={isSubmitting ? 'Adding...' : 'Add Student'}
              className="px-6 py-2 text-sm"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
