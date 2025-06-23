'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNewUniversityPage() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [deviceLimit, setDeviceLimit] = useState<string>('');
  const [logo, setLogo] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name || !deviceLimit) {
      alert('Please fill in all fields.');
      return;
    }
    alert('University created!');
    router.push('/universities');
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
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter University Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Device Limit</label>
              <select
                value={deviceLimit}
                onChange={(e) => setDeviceLimit(e.target.value)}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">Select</option>
                <option value="1">1 Device</option>
                <option value="5">5 Devices</option>
                <option value="10">10 Devices</option>
              </select>
            </div>
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
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => router.push('/universities')}
              className="border border-red-500 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
            >
              Create University
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 