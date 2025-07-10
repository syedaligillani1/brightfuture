import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const bannersFilePath = path.join(process.cwd(), 'app/universities/view/[id]/banners/banners.json');

// GET: List all banners
export async function GET(request: Request) {
  try {
    const fileData = await fs.readFile(bannersFilePath, 'utf8');
    const banners = JSON.parse(fileData);
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error reading banners:', error);
    return NextResponse.json({ success: false, error: 'Failed to read banners' }, { status: 500 });
  }
}

// POST: Create new banner
export async function POST(request: Request) {
  try {
    const newBanner = await request.json();
    const fileData = await fs.readFile(bannersFilePath, 'utf8');
    const banners = JSON.parse(fileData);
    if (!newBanner.id) {
      const maxId = banners.reduce((max: number, b: any) => Math.max(max, typeof b.id === 'number' ? b.id : parseInt(b.id, 10) || 0), 0);
      newBanner.id = maxId + 1;
    }
    banners.push(newBanner);
    await fs.writeFile(bannersFilePath, JSON.stringify(banners, null, 2));
    return NextResponse.json({ success: true, banner: newBanner });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json({ success: false, error: 'Failed to create banner' }, { status: 500 });
  }
}

// PUT: Update existing banner
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Banner ID is required' }, { status: 400 });
    }
    const updatedBanner = await request.json();
    const fileData = await fs.readFile(bannersFilePath, 'utf8');
    const banners = JSON.parse(fileData);
    const index = banners.findIndex((b: any) => b.id === parseInt(id, 10) || b.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });
    }
    banners[index] = { ...banners[index], ...updatedBanner, id: banners[index].id };
    await fs.writeFile(bannersFilePath, JSON.stringify(banners, null, 2));
    return NextResponse.json({ success: true, banner: banners[index] });
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ success: false, error: 'Failed to update banner' }, { status: 500 });
  }
}

// DELETE: Delete banner by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Banner ID is required' }, { status: 400 });
    }
    const fileData = await fs.readFile(bannersFilePath, 'utf8');
    const banners = JSON.parse(fileData);
    const index = banners.findIndex((b: any) => b.id === parseInt(id, 10) || b.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });
    }
    banners.splice(index, 1);
    await fs.writeFile(bannersFilePath, JSON.stringify(banners, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete banner' }, { status: 500 });
  }
} 