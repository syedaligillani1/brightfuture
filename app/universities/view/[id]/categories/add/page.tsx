'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import CancelButton from '@/app/reused-Components /CancelButton';
import InputField from '@/app/reused-Components /inputfield';

export default function AddCategoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const universityId = searchParams.get('universityId');
  const [name, setName] = useState('');
  const [totalCourses, setTotalCourses] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name) {
      alert('Please enter category name.');
      return;
    }
    if (!totalCourses) {
      alert('Please enter total courses.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newCategory = {
        name,
        totalCourses: Number(totalCourses),
        ...(universityId ? { universityId } : {})
      };
      const url = universityId
        ? `/api/categories?universityId=${encodeURIComponent(universityId)}`
        : '/api/categories';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        throw new Error('Failed to add category');
      }
      // Navigate back to categories page
      router.push(`/universities/view/${encodeURIComponent(universityId)}/categories`);
      router.refresh();
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
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
        <h2 className="text-lg font-medium mb-6">Add New Category</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Category Name"
            name="name"
            value={name}
            placeholder='Enter Category Name'
            onChange={e => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <InputField
            label="Total Courses"
            name="totalCourses"
            type="number"
            placeholder='Enter Number of Courses'
            value={totalCourses}
            onChange={e => setTotalCourses(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="flex justify-end gap-4 pt-4">
            <CancelButton
              label="Cancel"
              onClick={() => router.back()}
              className="px-6 py-2 text-sm"
              type="button"
              disabled={isSubmitting}
            />
            <PrimaryButton
              label={isSubmitting ? 'Adding...' : 'Add Category'}
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
