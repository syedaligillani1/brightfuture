import { prisma } from '@/app/lib/prisma';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';


const coursesFilePath = path.join(process.cwd(), 'app/universities/view/[id]/courses/courses.json');


// GET: List all courses

export async function GET(request: Request) {
  const courses = await prisma.course.findMany();
  return Response.json(courses);
}

// POST: Create new course
export async function POST(request: Request) {
  try {
    const newCourse = await request.json();
    const fileData = await fs.readFile(coursesFilePath, 'utf8');
    const courses = JSON.parse(fileData);
    if (!newCourse.id) {
      const maxId = courses.reduce((max: number, c: any) => Math.max(max, typeof c.id === 'number' ? c.id : parseInt(c.id, 10) || 0), 0);
      newCourse.id = maxId + 1;
    }
    courses.push(newCourse);
    await fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2));
    return NextResponse.json({ success: true, course: newCourse });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ success: false, error: 'Failed to create course' }, { status: 500 });
  }
}

// PUT: Update existing course
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }
    const updatedCourse = await request.json();
    const fileData = await fs.readFile(coursesFilePath, 'utf8');
    const courses = JSON.parse(fileData);
    const index = courses.findIndex((c: any) => c.id === parseInt(id, 10) || c.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    courses[index] = { ...courses[index], ...updatedCourse, id: courses[index].id };
    await fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2));
    return NextResponse.json({ success: true, course: courses[index] });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE: Delete course by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }
    const fileData = await fs.readFile(coursesFilePath, 'utf8');
    const courses = JSON.parse(fileData);
    const index = courses.findIndex((c: any) => c.id === parseInt(id, 10) || c.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }
    courses.splice(index, 1);
    await fs.writeFile(coursesFilePath, JSON.stringify(courses, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete course' }, { status: 500 });
  }
} 