import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const categoriesFilePath = path.join(process.cwd(), 'app/universities/view/[id]/categories/categories.json');

// GET: List categories filtered by universityId
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');

    if (!universityId) {
      return NextResponse.json({ success: false, error: 'University ID is required' }, { status: 400 });
    }

    const fileData = await fs.readFile(categoriesFilePath, 'utf8');
    const allCategories = JSON.parse(fileData);

    const categories = allCategories.filter((cat: any) => cat.universityId === universityId);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    return NextResponse.json({ success: false, error: 'Failed to read categories' }, { status: 500 });
  }
}

// POST: Create new category
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const universityId = searchParams.get('universityId');

    if (!universityId) {
      return NextResponse.json({ success: false, error: 'University ID is required' }, { status: 400 });
    }

    const newCategory = await request.json();
    newCategory.universityId = universityId;

    const fileData = await fs.readFile(categoriesFilePath, 'utf8');
    const categories = JSON.parse(fileData);

    if (!newCategory.id) {
      const maxId = categories.reduce((max: number, cat: any) => 
        Math.max(max, typeof cat.id === 'number' ? cat.id : parseInt(cat.id, 10) || 0), 0);
      newCategory.id = maxId + 1;
    }

    categories.push(newCategory);

    await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 });
  }
}

// PUT: Update existing category
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID and University ID are required' }, { status: 400 });
    }

    const updatedCategory = await request.json();
    const fileData = await fs.readFile(categoriesFilePath, 'utf8');
    const categories = JSON.parse(fileData);

    const index = categories.findIndex((cat: any) => cat.id === parseInt(id, 10) || cat.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    categories[index] = {
      ...categories[index],
      ...updatedCategory,
      id: categories[index].id,
    };

    await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));

    return NextResponse.json({ success: true, category: categories[index] });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE: Delete category by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    const fileData = await fs.readFile(categoriesFilePath, 'utf8');
    const categories = JSON.parse(fileData);

    const index = categories.findIndex((cat: any) => cat.id === parseInt(id, 10) || cat.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Category not found' }, { status: 404 });
    }

    categories.splice(index, 1);

    await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete category' }, { status: 500 });
  }
}
