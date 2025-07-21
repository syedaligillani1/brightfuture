import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const installmentsFilePath = path.join(process.cwd(), 'app/universities/view/[id]/installment/installments.json');

// GET: List all installment plans
export async function GET(request: Request) {
  try {
    const fileData = await fs.readFile(installmentsFilePath, 'utf8');
    const installments = JSON.parse(fileData);
    return NextResponse.json(installments);
  } catch (error) {
    console.error('Error reading installments:', error);
    return NextResponse.json({ success: false, error: 'Failed to read installments' }, { status: 500 });
  }
}

// POST: Create new installment plan
export async function POST(request: Request) {
  try {
    const newInstallment = await request.json();
    const fileData = await fs.readFile(installmentsFilePath, 'utf8');
    const installments = JSON.parse(fileData);
    if (!newInstallment.id) {
      const maxId = installments.reduce((max: number, i: any) => Math.max(max, typeof i.id === 'number' ? i.id : parseInt(i.id, 10) || 0), 0);
      newInstallment.id = maxId + 1;
    }
    installments.push(newInstallment);
    await fs.writeFile(installmentsFilePath, JSON.stringify(installments, null, 2));
    return NextResponse.json({ success: true, installment: newInstallment });
  } catch (error) {
    console.error('Error creating installment:', error);
    return NextResponse.json({ success: false, error: 'Failed to create installment' }, { status: 500 });
  }
}

// PUT: Update existing installment plan
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Installment ID is required' }, { status: 400 });
    }
    const updatedInstallment = await request.json();
    const fileData = await fs.readFile(installmentsFilePath, 'utf8');
    const installments = JSON.parse(fileData);
    const index = installments.findIndex((i: any) => i.id === parseInt(id, 10) || i.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Installment not found' }, { status: 404 });
    }
    installments[index] = { ...installments[index], ...updatedInstallment, id: installments[index].id };
    await fs.writeFile(installmentsFilePath, JSON.stringify(installments, null, 2));
    return NextResponse.json({ success: true, installment: installments[index] });
  } catch (error) {
    console.error('Error updating installment:', error);
    return NextResponse.json({ success: false, error: 'Failed to update installment' }, { status: 500 });
  }
}

// DELETE: Delete installment plan by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Installment ID is required' }, { status: 400 });
    }
    const fileData = await fs.readFile(installmentsFilePath, 'utf8');
    const installments = JSON.parse(fileData);
    const index = installments.findIndex((i: any) => i.id === parseInt(id, 10) || i.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Installment not found' }, { status: 404 });
    }
    installments.splice(index, 1);
    await fs.writeFile(installmentsFilePath, JSON.stringify(installments, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting installment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete installment' }, { status: 500 });
  }
} 