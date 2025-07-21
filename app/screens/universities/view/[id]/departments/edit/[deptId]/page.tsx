'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import departmentsData from '../../departments.json';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '@/app/components/inputfield';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function EditDepartmentPage() {
  const params = useParams();
  const universityId = params.id as string;
  const deptId = params.deptId as string;
  const router = useRouter();

  // State for department fields
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [totalCourses, setTotalCourses] = useState('');
  const [totalInstructors, setTotalInstructors] = useState('');
  const [totalStudents, setTotalStudents] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState('');
  const [conversion, setConversion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Find the department by id
    const dept = departmentsData.find(d => String(d.id) === String(deptId));
    if (dept) {
      setName(dept.name || '');
      setLogo(dept.logo || '');
      setTotalCourses(dept.totalCourses?.toString() || '');
      setTotalInstructors(dept.totalInstructors?.toString() || '');
      setTotalStudents(dept.totalStudents?.toString() || '');
      setEnrolledStudents(dept.enrolledStudents?.toString() || '');
      setConversion(dept.conversion?.toString() || '');
    }
  }, [deptId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedDepartment = {
        name,
        logo,
        totalCourses: Number(totalCourses),
        totalInstructors: Number(totalInstructors),
        totalStudents: Number(totalStudents),
        enrolledStudents: Number(enrolledStudents),
        conversion: Number(conversion),
      };
      const response = await fetch(`/api/departments?id=${deptId}&universityId=${encodeURIComponent(universityId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDepartment),
      });
      if (!response.ok) {
        throw new Error('Failed to update department');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/departments`);
      router.refresh();
    } catch (error) {
      alert('Failed to update department. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <InputField
          label="Logo URL"
          name="logo"
          value={logo}
          onChange={e => setLogo(e.target.value)}
        />
        <InputField
          label="Total Courses"
          name="totalCourses"
          type="number"
          value={totalCourses}
          onChange={e => setTotalCourses(e.target.value)}
        />
        <InputField
          label="Total Instructors"
          name="totalInstructors"
          type="number"
          value={totalInstructors}
          onChange={e => setTotalInstructors(e.target.value)}
        />
        <InputField
          label="Total Students"
          name="totalStudents"
          type="number"
          value={totalStudents}
          onChange={e => setTotalStudents(e.target.value)}
        />
        <InputField
          label="Enrolled Students"
          name="enrolledStudents"
          type="number"
          value={enrolledStudents}
          onChange={e => setEnrolledStudents(e.target.value)}
        />
        <InputField
          label="Conversion (%)"
          name="conversion"
          type="number"
          value={conversion}
          onChange={e => setConversion(e.target.value)}
        />
        <div className="flex justify-end gap-4 pt-4">
          <CancelButton
            label="Cancel"
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/departments`)}
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
