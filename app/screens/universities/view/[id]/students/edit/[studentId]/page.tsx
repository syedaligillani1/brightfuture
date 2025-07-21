'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import studentsData from '../../students.json';
import InputField from '@/app/components/inputfield';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const universityId = params.id as string;
  const studentId = params.studentId as string;

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [purchaseCourses, setPurchaseCourses] = useState('');
  const [mobile, setMobile] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const student = studentsData.find(s => String(s.id) === String(studentId));
    if (student) {
      setName(student.name || '');
      setDepartment(student.department || '');
      setPurchaseCourses(student.purchaseCourses?.toString() || '');
      setMobile(student.mobile || '');
      setStatus(!!student.status);
    }
  }, [studentId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedStudent = {
        name,
        department,
        purchaseCourses: Number(purchaseCourses),
        mobile,
        status,
      };
      const response = await fetch(`/api/students?id=${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/students`);
      router.refresh();
    } catch (error) {
      alert('Failed to update student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Student</h2>
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
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/students`)}
            className="px-6 py-2 text-sm"
            type="button"
            disabled={isSubmitting}
          />
          <PrimaryButton
            label={isSubmitting ? 'Saving...' : 'Save Changes'}
            className="px-6 py-2 text-sm"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
} 