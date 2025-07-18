'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import InputField from '@/app/components/inputfield';
import PrimaryButton from '@/app/components/PrimaryButton';
import CancelButton from '@/app/components/CancelButton';

export default function EditInstallmentPage() {
  const params = useParams();
  const router = useRouter();
  const universityId = params.id as string;
  const installmentId = params.installmentId as string;

  const [planName, setPlanName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [status, setStatus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlan() {
      try {
        const response = await fetch('/api/installments');
        const data = await response.json();
        const plan = data.find((p: any) => String(p.id) === String(installmentId));
        if (plan) {
          setPlanName(plan.planName || '');
          setTotalAmount(plan.totalAmount?.toString() || '');
          setInstallments(plan.installments?.toString() || '');
          setStatus(!!plan.status);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, [installmentId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedPlan = {
        planName,
        totalAmount: Number(totalAmount),
        installments: Number(installments),
        status,
      };
      const response = await fetch(`/api/installments?id=${installmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlan),
      });
      if (!response.ok) {
        throw new Error('Failed to update plan');
      }
      router.push(`/universities/view/${encodeURIComponent(universityId)}/installment`);
      router.refresh();
    } catch (error) {
      alert('Failed to update plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-6">Edit Installment Plan</h2>
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
            onClick={() => router.push(`/universities/view/${encodeURIComponent(universityId)}/installment`)}
            className="px-6 py-2 text-sm"
            type="button"
            disabled={isSubmitting}
          />
          <PrimaryButton
            label={isSubmitting ? 'Saving...' : 'Save Changes'}
            className="px-6 py-2 text-sm"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
} 