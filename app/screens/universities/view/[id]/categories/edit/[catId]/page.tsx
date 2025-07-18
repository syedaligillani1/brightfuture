'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import categoriesData from '../../categories.json';
import InputField from '@/app/components/inputfield';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const universityId = params.id as string;
  const catId = params.catId as string;

  const [name, setName] = useState('');
  const [totalCourses, setTotalCourses] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cat = categoriesData.find(c => String(c.id) === String(catId));
    if (cat) {
      setName(cat.name || '');
      setTotalCourses(cat.totalCourses?.toString() || '');
    }
  }, [catId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedCategory = {
        name,
        totalCourses: Number(totalCourses),
      };
      const response = await fetch(`/api/categories?id=${catId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
      });
      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/categories`);
      router.refresh();
    } catch (error) {
      alert('Failed to update category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Category Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <InputField
          label="Total Courses"
          name="totalCourses"
          type="number"
          value={totalCourses}
          onChange={e => setTotalCourses(e.target.value)}
        />
        <div className="flex justify-end gap-4 pt-4">
          <CancelButton
            label="Cancel"
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/categories`)}
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
