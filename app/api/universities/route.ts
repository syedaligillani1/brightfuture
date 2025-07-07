import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app/universities/universities.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const universities = JSON.parse(fileData);
    
    return NextResponse.json(universities);
  } catch (error) {
    console.error('Error reading universities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read universities' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newUniversity = await request.json();
    
    const filePath = path.join(process.cwd(), 'app/universities/universities.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const universities = JSON.parse(fileData);
    
    universities.push(newUniversity);
    
    await fs.writeFile(filePath, JSON.stringify(universities, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      university: newUniversity,
      action: 'created'
    });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create university' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const originalName = searchParams.get('originalName');
    const updatedUniversity = await request.json();
    
    if (!originalName) {
      return NextResponse.json(
        { success: false, error: 'Original university name is required' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(process.cwd(), 'app/universities/universities.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const universities = JSON.parse(fileData);
    
    const index = universities.findIndex((u: any) => u.name === originalName);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      );
    }
    
    universities[index] = updatedUniversity;
    
    await fs.writeFile(filePath, JSON.stringify(universities, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      university: updatedUniversity,
      action: 'updated'
    });
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update university' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityName = searchParams.get('name');

    if (!universityName) {
      return NextResponse.json(
        { success: false, error: 'University name is required' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'app/universities/universities.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const universities = JSON.parse(fileData);

    const updatedUniversities = universities.filter((u: any) => u.name !== universityName);

    if (universities.length === updatedUniversities.length) {
      return NextResponse.json(
        { success: false, error: 'University not found' },
        { status: 404 }
      );
    }

    await fs.writeFile(filePath, JSON.stringify(updatedUniversities, null, 2));

    return NextResponse.json({ 
      success: true, 
      message: 'University deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete university' },
      { status: 500 }
    );
  }
}