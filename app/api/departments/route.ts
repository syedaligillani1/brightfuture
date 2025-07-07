import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const departmentsFilePath = path.join(process.cwd(), 'app/universities/view/[id]/departments/departments.json');

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');

    if (!universityId) {
      return NextResponse.json(
        { success: false, error: 'University ID is required' },
        { status: 400 }
      );
    }

    const fileData = await fs.readFile(departmentsFilePath, 'utf8');
    const allDepartments = JSON.parse(fileData);
    
    // Filter departments for the specific university
    const departments = allDepartments.filter((dept: any) => dept.universityId === universityId);
    
    return NextResponse.json(departments);
  } catch (error) {
    console.error('Error reading departments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read departments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');

    if (!universityId) {
      return NextResponse.json(
        { success: false, error: 'University ID is required' },
        { status: 400 }
      );
    }

    const newDepartment = await request.json();
    newDepartment.universityId = universityId;
    
    const fileData = await fs.readFile(departmentsFilePath, 'utf8');
    const departments = JSON.parse(fileData);
    
    if (!newDepartment.id) {
      const maxId = departments.reduce((max: number, dept: any) => 
        Math.max(max, typeof dept.id === 'number' ? dept.id : parseInt(dept.id, 10) || 0), 0);
      newDepartment.id = maxId + 1;
    }
    
    departments.push(newDepartment);
    
    await fs.writeFile(departmentsFilePath, JSON.stringify(departments, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      department: newDepartment 
    });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create department' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const universityId = searchParams.get('universityId');

    if (!id || !universityId) {
      return NextResponse.json(
        { success: false, error: 'Department ID and University ID are required' },
        { status: 400 }
      );
    }

    const fileData = await fs.readFile(departmentsFilePath, 'utf8');
    const departments = JSON.parse(fileData);
    
    const departmentIndex = departments.findIndex((dept: any) => 
      (dept.id === parseInt(id, 10) || dept.id === id) && 
      dept.universityId === universityId
    );

    if (departmentIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Department not found' },
        { status: 404 }
      );
    }

    departments.splice(departmentIndex, 1);
    
    await fs.writeFile(departmentsFilePath, JSON.stringify(departments, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting department:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete department' },
      { status: 500 }
    );
  }
}