'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SignupPage() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [DOB, setDOB] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, password, gender, DOB })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setSuccess('Signup successful! You can now log in.');
      setUsername('');
      setPassword('');
      setGender('');
      setDOB('');
      setTimeout(() => router.push('/screens/login'), 1500);
    } else {
      setError(data.error || 'Signup failed');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={userName}
          onChange={e => setUsername(e.target.value)}
          className="bg-gray-200 border px-2 py-2"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-gray-200 border px-2 py-2"
        />
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
          className="bg-gray-200 border px-2 py-2"
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={DOB}
          onChange={e => setDOB(e.target.value)}
          className="bg-gray-200 border px-2 py-2"
        />
        <button className="bg-blue-900 text-white px-2 py-2">Submit</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </div>
  )
}