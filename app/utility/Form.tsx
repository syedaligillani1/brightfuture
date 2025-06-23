import React from 'react';
import Button from './Button';

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
  gridCols?: 1 | 2 | 3;
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
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  }[gridCols];

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
    <form onSubmit={onSubmit} className={className}>
      <div className={`grid ${gridClass} gap-6 mb-6`}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button
            label={cancelLabel}
            variant="secondary"
            onClick={onCancel}
            type="button"
          />
        )}
        <Button
          label={submitLabel}
          variant="primary"
          type="submit"
        />
      </div>
    </form>
  );
} 