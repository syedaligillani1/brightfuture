import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const studentFilePath = path.join(process.cwd(), 'app/universities/view/[id]/students/students.json');// GET: List student filtered by universityId
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');

    if (!universityId) {
      return NextResponse.json({ success: false, error: 'University ID is required' }, { status: 400 });
    }

    const fileData = await fs.readFile(studentFilePath, 'utf8');
    const allstudent = JSON.parse(fileData);

    const student = allstudent.filter((std: any) => std.universityId === universityId);
    return NextResponse.json(student);
  } catch (error) {
    console.error('Error reading student:', error);
    return NextResponse.json({ success: false, error: 'Failed to read student' }, { status: 500 });
  }
}

// POST: Create new student
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');

    if (!universityId) {
      return NextResponse.json({ success: false, error: 'University ID is required' }, { status: 400 });
    }

    const newstudent = await request.json();
    newstudent.universityId = universityId;

    const fileData = await fs.readFile(studentFilePath, 'utf8');
    const student = JSON.parse(fileData);

    if (!newstudent.id) {
      const maxId = student.reduce((max: number, std: any) => 
        Math.max(max, typeof std.id === 'number' ? std.id : parseInt(std.id, 10) || 0), 0);
      newstudent.id = maxId + 1;
    }

    student.push(newstudent);

    await fs.writeFile(studentFilePath, JSON.stringify(student, null, 2));

    return NextResponse.json({ success: true, student: newstudent });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ success: false, error: 'Failed to create student' }, { status: 500 });
  }
}

// PUT: Update existing student
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'student ID and University ID are required' }, { status: 400 });
    }

    const updatedstudent = await request.json();
    const fileData = await fs.readFile(studentFilePath, 'utf8');
    const student = JSON.parse(fileData);

    const index = student.findIndex((std: any) => std.id === parseInt(id, 10) || std.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'student not found' }, { status: 404 });
    }

    student[index] = {
      ...student[index],
      ...updatedstudent,
      id: student[index].id,
    };

    await fs.writeFile(studentFilePath, JSON.stringify(student, null, 2));

    return NextResponse.json({ success: true, student: student[index] });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ success: false, error: 'Failed to update student' }, { status: 500 });
  }
}

// DELETE: Delete student by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'student ID is required' }, { status: 400 });
    }

    const fileData = await fs.readFile(studentFilePath, 'utf8');
    const student = JSON.parse(fileData);

    const index = student.findIndex((std: any) => std.id === parseInt(id, 10) || std.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'student not found' }, { status: 404 });
    }

    student.splice(index, 1);

    await fs.writeFile(studentFilePath, JSON.stringify(student, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete student' }, { status: 500 });
  }
}
