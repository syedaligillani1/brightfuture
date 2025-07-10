import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const semestersFilePath = path.join(process.cwd(), 'app/universities/view/[id]/semesters/semesters.json');

// GET: List all semesters
export async function GET(request: Request) {
  try {
    const fileData = await fs.readFile(semestersFilePath, 'utf8');
    const semesters = JSON.parse(fileData);
    return NextResponse.json(semesters);
  } catch (error) {
    console.error('Error reading semesters:', error);
    return NextResponse.json({ success: false, error: 'Failed to read semesters' }, { status: 500 });
  }
}

// POST: Create new semester
export async function POST(request: Request) {
  try {
    const newSemester = await request.json();
    const fileData = await fs.readFile(semestersFilePath, 'utf8');
    const semesters = JSON.parse(fileData);
    if (!newSemester.id) {
      const maxId = semesters.reduce((max: number, s: any) => Math.max(max, typeof s.id === 'number' ? s.id : parseInt(s.id, 10) || 0), 0);
      newSemester.id = maxId + 1;
    }
    semesters.push(newSemester);
    await fs.writeFile(semestersFilePath, JSON.stringify(semesters, null, 2));
    return NextResponse.json({ success: true, semester: newSemester });
  } catch (error) {
    console.error('Error creating semester:', error);
    return NextResponse.json({ success: false, error: 'Failed to create semester' }, { status: 500 });
  }
}

// PUT: Update existing semester
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Semester ID is required' }, { status: 400 });
    }
    const updatedSemester = await request.json();
    const fileData = await fs.readFile(semestersFilePath, 'utf8');
    const semesters = JSON.parse(fileData);
    const index = semesters.findIndex((s: any) => s.id === parseInt(id, 10) || s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Semester not found' }, { status: 404 });
    }
    semesters[index] = { ...semesters[index], ...updatedSemester, id: semesters[index].id };
    await fs.writeFile(semestersFilePath, JSON.stringify(semesters, null, 2));
    return NextResponse.json({ success: true, semester: semesters[index] });
  } catch (error) {
    console.error('Error updating semester:', error);
    return NextResponse.json({ success: false, error: 'Failed to update semester' }, { status: 500 });
  }
}

// DELETE: Delete semester by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Semester ID is required' }, { status: 400 });
    }
    const fileData = await fs.readFile(semestersFilePath, 'utf8');
    const semesters = JSON.parse(fileData);
    const index = semesters.findIndex((s: any) => s.id === parseInt(id, 10) || s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Semester not found' }, { status: 404 });
    }
    semesters.splice(index, 1);
    await fs.writeFile(semestersFilePath, JSON.stringify(semesters, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting semester:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete semester' }, { status: 500 });
  }
} 