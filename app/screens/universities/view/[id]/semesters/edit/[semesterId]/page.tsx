'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import InputField from '@/app/components/inputfield';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function EditSemesterPage() {
  const params = useParams();
  const router = useRouter();
  const universityId = params.id as string;
  const semesterId = params.semesterId as string;

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSemester() {
      try {
        const response = await fetch('/api/semesters');
        const data = await response.json();
        const semester = data.find((s: any) => String(s.id) === String(semesterId));
        if (semester) {
          setName(semester.name || '');
          setStartDate(semester.startDate || '');
          setEndDate(semester.endDate || '');
          setStatus(!!semester.status);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSemester();
  }, [semesterId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedSemester = {
        name,
        startDate,
        endDate,
        status,
      };
      const response = await fetch(`/api/semesters?id=${semesterId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSemester),
      });
      if (!response.ok) {
        throw new Error('Failed to update semester');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/semesters`);
      router.refresh();
    } catch (error) {
      alert('Failed to update semester. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Semester</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Semester Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <InputField
          label="Start Date"
          name="startDate"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
        />
        <InputField
          label="End Date"
          name="endDate"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
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
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/semesters`)}
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