'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import InputField from '@/app/reused-Components /inputfield';
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import CancelButton from '@/app/reused-Components /CancelButton';

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const universityId = params.id as string;
  const courseId = params.courseId as string;

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [credits, setCredits] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        const course = data.find((c: any) => String(c.id) === String(courseId));
        if (course) {
          setName(course.name || '');
          setDepartment(course.department || '');
          setCredits(course.credits?.toString() || '');
          setStatus(!!course.status);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedCourse = {
        name,
        department,
        credits: Number(credits),
        status,
      };
      const response = await fetch(`/api/courses?id=${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCourse),
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/courses`);
      router.refresh();
    } catch (error) {
      alert('Failed to update course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Course Name"
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
          label="Credits"
          name="credits"
          type="number"
          value={credits}
          onChange={e => setCredits(e.target.value)}
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
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/courses`)}
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