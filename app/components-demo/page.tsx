'use client';
import { useState } from 'react';
import Button from '../utility/Button';
import Card from '../utility/Card';
import Form from '../utility/Form';
import Modal from '../utility/Modal';
import Tabs from '../utility/Tabs';

export default function ComponentsDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');

  const formFields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text' as const,
      value: '',
      placeholder: 'Enter your name',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      value: '',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      value: '',
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' },
        { value: 'guest', label: 'Guest' }
      ]
    }
  ];

  const tabs = [
    { key: 'buttons', label: 'Buttons' },
    { key: 'cards', label: 'Cards' },
    { key: 'forms', label: 'Forms' },
    { key: 'tabs', label: 'Tabs' },
    { key: 'modals', label: 'Modals' }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  const handleFieldChange = (name: string, value: string) => {
    console.log(`Field ${name} changed to: ${value}`);
  };

  const renderButtonsDemo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Danger" variant="danger" />
          <Button label="Success" variant="success" />
          <Button label="Outline" variant="outline" />
          <Button label="Ghost" variant="ghost" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button label="Small" variant="primary" size="sm" />
          <Button label="Medium" variant="primary" size="md" />
          <Button label="Large" variant="primary" size="lg" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button label="Normal" variant="primary" />
          <Button label="Disabled" variant="primary" disabled />
          <Button label="Loading" variant="primary" disabled />
        </div>
      </div>
    </div>
  );

  const renderCardsDemo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Default Card" subtitle="This is a default card">
          <p>This is the content of a default card.</p>
        </Card>

        <Card title="Elevated Card" subtitle="This is an elevated card" variant="elevated">
          <p>This is the content of an elevated card.</p>
        </Card>

        <Card title="Outlined Card" subtitle="This is an outlined card" variant="outlined">
          <p>This is the content of an outlined card.</p>
        </Card>

        <Card title="Filled Card" subtitle="This is a filled card" variant="filled">
          <p>This is the content of a filled card.</p>
        </Card>

        <Card 
          title="Card with Actions" 
          subtitle="This card has header actions"
          headerActions={
            <Button label="Action" variant="primary" size="sm" />
          }
        >
          <p>This card has header actions.</p>
        </Card>

        <Card 
          title="Clickable Card" 
          subtitle="This card is clickable"
          onClick={() => alert('Card clicked!')}
        >
          <p>Click this card to see an alert.</p>
        </Card>
      </div>
    </div>
  );

  const renderFormsDemo = () => (
    <div className="space-y-6">
      <Card title="Form Demo" subtitle="Reusable form component">
        <Form
          fields={formFields}
          onSubmit={handleFormSubmit}
          onFieldChange={handleFieldChange}
          submitLabel="Submit Form"
          cancelLabel="Reset"
          onCancel={() => console.log('Form cancelled')}
        />
      </Card>
    </div>
  );

  const renderTabsDemo = () => (
    <div className="space-y-6">
      <Card title="Tabs Demo" subtitle="Reusable tabs component">
        <Tabs
          tabs={[
            { key: 'tab1', label: 'Tab 1' },
            { key: 'tab2', label: 'Tab 2' },
            { key: 'tab3', label: 'Tab 3' }
          ]}
          activeTab="tab1"
          onTabChange={(tab) => console.log('Tab changed to:', tab)}
        />
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p>Tab content would go here.</p>
        </div>
      </Card>
    </div>
  );

  const renderModalsDemo = () => (
    <div className="space-y-6">
      <Card title="Modal Demo" subtitle="Reusable modal component">
        <Button 
          label="Open Modal" 
          variant="primary" 
          onClick={() => setIsModalOpen(true)} 
        />
        
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Modal Title</h3>
            <p className="mb-4">This is a reusable modal component.</p>
            <div className="flex justify-end gap-3">
              <Button 
                label="Cancel" 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)} 
              />
              <Button 
                label="Confirm" 
                variant="primary" 
                onClick={() => setIsModalOpen(false)} 
              />
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'buttons':
        return renderButtonsDemo();
      case 'cards':
        return renderCardsDemo();
      case 'forms':
        return renderFormsDemo();
      case 'tabs':
        return renderTabsDemo();
      case 'modals':
        return renderModalsDemo();
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reusable Components Demo</h1>
      
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        variant="default"
        className="mb-6"
      />
      
      {renderContent()}
    </div>
  );
} 