import React from 'react';
import PrimaryButton from '@/app/reused-Components /PrimaryButton';
import CancelButton from '@/app/reused-Components /CancelButton';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'file';
  value: string | number;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

type FormProps = {
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
  onFieldChange: (name: string, value: string) => void;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4;
};

export default function Form({
  fields,
  onSubmit,
  onFieldChange,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  className = '',
  gridCols = 2
}: FormProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[gridCols] || 'grid-cols-1 md:grid-cols-2';

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: field.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => 
        onFieldChange(field.name, e.target.value),
      className: 'w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500',
      disabled: field.disabled,
      required: field.required,
      placeholder: field.placeholder
    };

    switch (field.type) {
      case 'select':
        return (
          <select {...commonProps}>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={`${commonProps.className} resize-none`}
          />
        );
      case 'file':
        return (
          <input
            {...commonProps}
            type="file"
            className={`${commonProps.className} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
          />
        );
      default:
        return <input {...commonProps} type={field.type} />;
    }
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      <div className={`grid ${gridClass} gap-4 sm:gap-6`}>
        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
      
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
        {onCancel && (
          <CancelButton
            label={cancelLabel}
            onClick={onCancel}
            className="w-full"
            type="button"
          />
        )}
        <PrimaryButton
          label={submitLabel}
          className="w-full"
          type="submit"
        />
      </div>
    </form>
  );
} 