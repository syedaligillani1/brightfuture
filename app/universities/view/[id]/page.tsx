'use client';

import React from 'react';
import { universityData, University } from '../../data';

const UniversityInfoCard = ({ university }: { university: University }) => {
    if (!university) {
        return <p>University not found.</p>
    }
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-6">
                <img src="/logo.png" alt="University Logo" className="w-16 h-16 mr-6" />
                <h2 className="text-2xl font-bold">{university.name}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">University Name</p>
                    <p className="font-semibold">{university.name}</p>
                </div>
                <div>
                    <p className="text-gray-500">Device Limit</p>
                    <p className="font-semibold">4</p>
                </div>
                <div>
                    <p className="text-gray-500">Created At</p>
                    <p className="font-semibold">2024-09-30 07:41:16</p>
                </div>
                <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-semibold">{university.departments}</p>
                </div>
                <div>
                    <p className="text-gray-500">Instructors</p>
                    <p className="font-semibold">{university.instructors}</p>
                </div>
                <div>
                    <p className="text-gray-500">Courses</p>
                    <p className="font-semibold">{university.courses}</p>
                </div>
                <div>
                    <p className="text-gray-500">Registered Student</p>
                    <p className="font-semibold">{university.totalStudents}</p>
                </div>
                <div>
                    <p className="text-gray-500">Enrolled Students</p>
                    <p className="font-semibold">{university.enrolledStudents}</p>
                </div>
            </div>
        </div>
    );
};

const ViewUniversityPage = ({ params }: { params: { id: string } }) => {
    const university = universityData.find(u => u.name === decodeURIComponent(params.id));
    
    if (!university) {
        return (
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">University Not Found</h1>
            </div>
        )
    }

    return (
        <UniversityInfoCard university={university} />
    );
};

export default ViewUniversityPage; 