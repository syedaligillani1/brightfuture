import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const storiesFilePath = path.join(process.cwd(), 'app/universities/view/[id]/stories/stories.json');

// GET: List all stories
export async function GET(request: Request) {
  try {
    const fileData = await fs.readFile(storiesFilePath, 'utf8');
    const stories = JSON.parse(fileData);
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Error reading stories:', error);
    return NextResponse.json({ success: false, error: 'Failed to read stories' }, { status: 500 });
  }
}

// POST: Create new story
export async function POST(request: Request) {
  try {
    const newStory = await request.json();
    const fileData = await fs.readFile(storiesFilePath, 'utf8');
    const stories = JSON.parse(fileData);
    if (!newStory.id) {
      const maxId = stories.reduce((max: number, s: any) => Math.max(max, typeof s.id === 'number' ? s.id : parseInt(s.id, 10) || 0), 0);
      newStory.id = maxId + 1;
    }
    stories.push(newStory);
    await fs.writeFile(storiesFilePath, JSON.stringify(stories, null, 2));
    return NextResponse.json({ success: true, story: newStory });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ success: false, error: 'Failed to create story' }, { status: 500 });
  }
}

// PUT: Update existing story
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Story ID is required' }, { status: 400 });
    }
    const updatedStory = await request.json();
    const fileData = await fs.readFile(storiesFilePath, 'utf8');
    const stories = JSON.parse(fileData);
    const index = stories.findIndex((s: any) => s.id === parseInt(id, 10) || s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Story not found' }, { status: 404 });
    }
    stories[index] = { ...stories[index], ...updatedStory, id: stories[index].id };
    await fs.writeFile(storiesFilePath, JSON.stringify(stories, null, 2));
    return NextResponse.json({ success: true, story: stories[index] });
  } catch (error) {
    console.error('Error updating story:', error);
    return NextResponse.json({ success: false, error: 'Failed to update story' }, { status: 500 });
  }
}

// DELETE: Delete story by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Story ID is required' }, { status: 400 });
    }
    const fileData = await fs.readFile(storiesFilePath, 'utf8');
    const stories = JSON.parse(fileData);
    const index = stories.findIndex((s: any) => s.id === parseInt(id, 10) || s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Story not found' }, { status: 404 });
    }
    stories.splice(index, 1);
    await fs.writeFile(storiesFilePath, JSON.stringify(stories, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete story' }, { status: 500 });
  }
} 