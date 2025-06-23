import React from 'react';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: CardVariant;
  className?: string;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
};

export default function Card({
  children,
  title,
  subtitle,
  variant = 'default',
  className = '',
  headerActions,
  footer,
  onClick
}: CardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    elevated: 'bg-white shadow-lg border border-gray-200',
    outlined: 'bg-white border-2 border-gray-200',
    filled: 'bg-gray-50 border border-gray-200'
  };

  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-md hover:border-gray-300' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${clickableClasses} ${className}`;

  return (
    <div className={classes} onClick={onClick}>
      {(title || subtitle || headerActions) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
          </div>
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
} 