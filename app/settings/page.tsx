'use client';
import { useRouter } from 'next/navigation';
import Card from '../utility/Card';
import Button from '../utility/Button';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button 
          label="Save Settings" 
          variant="primary" 
          onClick={() => alert('Settings saved successfully!')} 
        />
      </div>

      <Card
        title="System Settings"
        subtitle="Configure system preferences and configurations"
        variant="elevated"
      >
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600 mb-6">
              This page will contain comprehensive system settings and configuration options including:
            </p>
            <ul className="text-left text-sm text-gray-600 mb-6 space-y-2">
              <li>• User preferences and profiles</li>
              <li>• System notifications</li>
              <li>• Security settings</li>
              <li>• Data backup and restore</li>
              <li>• System maintenance</li>
            </ul>
            <div className="flex gap-3 justify-center">
              <Button 
                label="Back to Universities" 
                variant="secondary" 
                onClick={() => router.push('/universities')} 
              />
              <Button 
                label="Go to Profile" 
                variant="primary" 
                onClick={() => router.push('/profile')} 
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
