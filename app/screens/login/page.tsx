'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/Modal';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setModalOpen(false);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, password }),
      credentials: 'include', 
    });

    if (res.ok) {
      
    router.push('/screens/universities');
      
    } else {
      console.log('fds');
      
      const data = await res.json();
      setModalContent({
        title: 'Login Failed',
        description: data.error || 'Invalid credentials',
      });
      setModalOpen(true);
    }
  }

  return (
    <div>
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className='border px-2 py-1 bg-white'
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='border px-2 py-1 bg-white'

        />
        <button className="bg-blue-900 text-white px-2 py-2">Submit</button>
      </form>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        description={modalContent.description}
        confirmLabel="OK"
      />
    </div>
  );
}