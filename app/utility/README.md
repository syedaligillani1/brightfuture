# Reusable Components

This directory contains reusable UI components that can be used throughout the application.

## Components

### Button
A versatile button component with multiple variants, sizes, and states.

**Props:**
- `label`: string - Button text
- `onClick?`: () => void - Click handler
- `variant?`: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost' - Button style
- `size?`: 'sm' | 'md' | 'lg' - Button size
- `disabled?`: boolean - Disabled state
- `type?`: 'button' | 'submit' | 'reset' - Button type
- `icon?`: React.ReactNode - Icon element
- `iconPosition?`: 'left' | 'right' - Icon position
- `fullWidth?`: boolean - Full width button
- `className?`: string - Additional CSS classes

**Usage:**
```tsx
import Button from '../utility/Button';

<Button 
  label="Click me" 
  variant="primary" 
  size="md" 
  onClick={() => console.log('clicked')} 
/>
```

### Card
A flexible card component with different variants and optional header/footer sections.

**Props:**
- `children`: React.ReactNode - Card content
- `title?`: string - Card title
- `subtitle?`: string - Card subtitle
- `variant?`: 'default' | 'elevated' | 'outlined' | 'filled' - Card style
- `className?`: string - Additional CSS classes
- `headerActions?`: React.ReactNode - Actions in header
- `footer?`: React.ReactNode - Footer content
- `onClick?`: () => void - Click handler

**Usage:**
```tsx
import Card from '../utility/Card';

<Card 
  title="Card Title" 
  subtitle="Card subtitle" 
  variant="elevated"
>
  <p>Card content goes here</p>
</Card>
```

### Form
A reusable form component that handles common form patterns.

**Props:**
- `fields`: FormField[] - Array of form fields
- `onSubmit`: (e: React.FormEvent) => void - Form submit handler
- `onFieldChange`: (name: string, value: string) => void - Field change handler
- `submitLabel?`: string - Submit button text
- `cancelLabel?`: string - Cancel button text
- `onCancel?`: () => void - Cancel handler
- `className?`: string - Additional CSS classes
- `gridCols?`: 1 | 2 | 3 - Grid columns layout

**FormField type:**
```tsx
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
```

**Usage:**
```tsx
import Form from '../utility/Form';

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    value: '',
    required: true
  }
];

<Form 
  fields={fields}
  onSubmit={handleSubmit}
  onFieldChange={handleFieldChange}
/>
```

### Tabs
A tab navigation component with different variants.

**Props:**
- `tabs`: Tab[] - Array of tab objects
- `activeTab`: string - Currently active tab key
- `onTabChange`: (tabKey: string) => void - Tab change handler
- `variant?`: 'default' | 'pills' | 'underline' - Tab style
- `size?`: 'sm' | 'md' | 'lg' - Tab size
- `className?`: string - Additional CSS classes

**Tab type:**
```tsx
type Tab = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};
```

**Usage:**
```tsx
import Tabs from '../utility/Tabs';

const tabs = [
  { key: 'tab1', label: 'Tab 1' },
  { key: 'tab2', label: 'Tab 2' }
];

<Tabs 
  tabs={tabs}
  activeTab="tab1"
  onTabChange={setActiveTab}
/>
```

### Modal
A modal dialog component.

**Props:**
- `open`: boolean - Modal visibility
- `onClose`: () => void - Close handler
- `children`: React.ReactNode - Modal content

**Usage:**
```tsx
import Modal from '../utility/Modal';

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <div>Modal content</div>
</Modal>
```

## Importing Components

Import components using direct paths:

```tsx
import Button from '../utility/Button';
import Card from '../utility/Card';
import Form from '../utility/Form';
import Modal from '../utility/Modal';
import Tabs from '../utility/Tabs';
```

## Demo Page

Visit `/components-demo` to see all components in action with examples of different variants and configurations. 