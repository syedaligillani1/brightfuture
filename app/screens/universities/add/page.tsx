'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';
import InputField from '@/app/components/inputfield';
import FileUploadField from '@/app/components/fileupload';
import SelectBox from '@/app/components/selectbox';
import ToggleBtn from '@/app/components/ToggleBtn';
// import SelectBox from '@/app/reused-Components /selectbox';
// import ToggleBtn from '@/app/reused-Components /ToggleBtn';

ToggleBtn

export default function AddNewUniversityPage() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [deviceLimit, setDeviceLimit] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !deviceLimit) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUniversity = {
        name,
        logo: '/logo.png',
        departments: Number(deviceLimit), // Devices
        instructors: 0,
        courses: 0,
        totalStudents: 0,
        enrolledStudents: 0,
        status,
      };

      const response = await fetch('/api/universities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUniversity),
      });

      if (!response.ok) {
        throw new Error('Failed to add university');
      }

      router.push('/universities?added=1');
      router.refresh();
    } catch (error) {
      console.error('Error adding university:', error);
      alert('Failed to add university. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Universities / <span className="text-gray-500">Add New University</span></h1>
      </header>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-6">Add New University</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter University Name"
              required
            />
            <SelectBox
              label="Device Limit"
              value={deviceLimit}
              onChange={(e) => setDeviceLimit(e.target.value)}
              options={[
                { label: '1 Device', value: '1' },
                { label: '5 Devices', value: '5' },
                { label: '10 Devices', value: '10' },
              ]}
            />
            <ToggleBtn
              label="Status"
              value={status === 'Active'}
              onChange={(val) => setStatus(val ? 'Active' : 'Inactive')}
            />
          </div>
          <FileUploadField
            label="University Logo"
            onChange={handleLogoChange}
            accept="image/*"
            disabled={isSubmitting}
          />
          <div className="flex justify-end gap-3 mt-4">
            <CancelButton
              label="Cancel"
              onClick={() => router.push('/universities')}
              className="px-4 py-2 text-sm"
              type="button"
              disabled={isSubmitting}
            />
            <PrimaryButton
              label={isSubmitting ? 'Creating...' : 'Create University'}
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