'use client';

import React from 'react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { University } from '../../data';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [deviceLimit, setDeviceLimit] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUniversity, setCurrentUniversity] = useState<University | null>(null);
  const [originalName, setOriginalName] = useState<string>('');

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const universityName = decodeURIComponent(resolvedParams.id);
        setOriginalName(universityName);
        
        const response = await fetch('/api/universities');
        if (!response.ok) {
          throw new Error('Failed to fetch university data');
        }
        
        const universities: University[] = await response.json();
        const foundUniversity = universities.find(u => u.name === universityName);
        
        if (foundUniversity) {
          setCurrentUniversity(foundUniversity);
          setName(foundUniversity.name);
          setDeviceLimit(String(foundUniversity.departments));
          setStatus(foundUniversity.status);
        } else {
          throw new Error('University not found');
        }
      } catch (error) {
        console.error('Error fetching university:', error);
        setError(error instanceof Error ? error.message : 'Failed to load university data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversity();
  }, [resolvedParams.id]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !deviceLimit) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedUniversity: University = {
        name,
        logo: currentUniversity?.logo || '/logo.png',
        departments: Number(deviceLimit),
        instructors: currentUniversity?.instructors || 0,
        courses: currentUniversity?.courses || 0,
        totalStudents: currentUniversity?.totalStudents || 0,
        enrolledStudents: currentUniversity?.enrolledStudents || 0,
        status,
      };

      const response = await fetch(`/api/universities?originalName=${encodeURIComponent(originalName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUniversity),
      });

      if (!response.ok) {
        throw new Error('Failed to update university');
      }

      router.push(`/universities?edited=${encodeURIComponent(name)}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating university:', error);
      alert('Failed to update university. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }


  function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push('/universities')}
            className="mt-4 text-sm text-red-600 hover:text-red-800 underline"
          >
            Return to Universities
          </button>
        </div>
      </div>
    );
  }

  if (!currentUniversity) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          <h2 className="text-lg font-semibold mb-2">University Not Found</h2>
          <p>The university you're trying to edit could not be found.</p>
          <button
            onClick={() => router.push('/universities')}
            className="mt-4 text-sm text-yellow-600 hover:text-yellow-800 underline"
          >
            Return to Universities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Universities / <span className="text-gray-500">Edit University</span></h1>
      </header>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Edit University</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter University Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Device Limit</label>
            <select
              value={deviceLimit}
              onChange={(e) => setDeviceLimit(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              disabled={isSubmitting}
            >
              <option value="">Select</option>
              <option value="1">1 Device</option>
              <option value="5">5 Devices</option>
              <option value="10">10 Devices</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
              className="w-full border rounded p-2 text-sm"
              disabled={isSubmitting}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">University Logo</label>
            <div className="border border-dashed border-gray-300 p-6 rounded flex flex-col items-center justify-center text-center">
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="text-blue-800 font-bold text-sm">Upload Logo</div>
              </label>
              <input
                id="logo-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleLogoChange}
                disabled={isSubmitting}
              />
              {currentUniversity?.logo && (
                <div className="mt-4">
                  <img src={currentUniversity.logo} alt="University logo" className="h-20 w-20 object-contain" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <CancelButton
              label="Cancel"
              onClick={() => router.push('/universities')}
              className="px-4 py-2 text-sm"
              type="button"
              disabled={isSubmitting}
            />
            <PrimaryButton
              label={isSubmitting ? 'Saving...' : 'Save Changes'}
              className="px-4 py-2 text-sm"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
} 