'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ViewUniversityPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [university, setUniversity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const name = decodeURIComponent(params.id);
        const res = await fetch('/api/universities');
        const data = await res.json();

        const found = data.find((u: any) => u.name === name);
        if (!found) throw new Error('University not found');

        setUniversity(found);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!university) return <p>University not found.</p>;
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Universities / <span className="text-gray-500">View University</span></h1>
      </header>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-6">{university.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Device Limit</label>
                <p className="mt-1">{university.departments} Devices</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <p className={`mt-1 ${university.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {university.status}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Total Students</label>
                <p className="mt-1">{university.totalStudents}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Enrolled Students</label>
                <p className="mt-1">{university.enrolledStudents}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Courses</label>
                <p className="mt-1">{university.courses}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Instructors</label>
                <p className="mt-1">{university.instructors}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">University Logo</label>
              <div className="mt-2">
                <img src={university.logo} alt="University logo" className="h-32 w-32 object-contain border rounded p-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => router.push('/universities')}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50"
          >
            Back to Universities
          </button>
          <button
            onClick={() => router.push(`/universities/edit/${encodeURIComponent(university.name)}`)}
            className="bg-blue-900 text-white px-4 py-2 rounded text-sm hover:bg-blue-800"
          >
            Edit University
          </button>
        </div>
      </div>
    </div>
  );
}