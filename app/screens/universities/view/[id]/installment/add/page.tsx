'use client';
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import InputField from '@/app/components/inputfield';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function AddInstallmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const universityId = searchParams.get('universityId');
  const [planName, setPlanName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!planName || !totalAmount || !installments) {
      alert('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      const newPlan = {
        planName,
        totalAmount: Number(totalAmount),
        installments: Number(installments),
        status,
        ...(universityId ? { universityId } : {})
      };
      const url = universityId
        ? `/api/installments?universityId=${encodeURIComponent(universityId)}`
        : '/api/installments';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlan),
      });
      if (!response.ok) {
        throw new Error('Failed to add plan');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/installment`);
      router.refresh();
    } catch (error) {
      alert('Failed to add plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!universityId) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-red-500">Error: University ID is required</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-6">Add New Installment Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Plan Name"
            name="planName"
            value={planName}
            onChange={e => setPlanName(e.target.value)}
            required
          />
          <InputField
            label="Total Amount"
            name="totalAmount"
            type="number"
            value={totalAmount}
            onChange={e => setTotalAmount(e.target.value)}
            required
          />
          <InputField
            label="Installments"
            name="installments"
            type="number"
            value={installments}
            onChange={e => setInstallments(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <label className="text-sm">Status:</label>
            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
              className="h-4 w-4"
              disabled={isSubmitting}
            />
            <span className="text-sm">{status ? 'Active' : 'Inactive'}</span>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <CancelButton
              label="Cancel"
              onClick={() => router.back()}
              className="px-6 py-2 text-sm"
              type="button"
              disabled={isSubmitting}
            />
            <PrimaryButton
              label={isSubmitting ? 'Adding...' : 'Add Plan'}
              className="px-6 py-2 text-sm"
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
} 