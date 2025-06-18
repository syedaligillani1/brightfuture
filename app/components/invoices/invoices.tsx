import React from 'react';



export default function Card({ heading, icon, amount, sales }: CardProps) {
  return (
    <div className="space-y-3 bg-white rounded-xl shadow p-6 w-full max-w-xs">
      <div>{icon}</div>
      <div className="font-sans">{label}</div>
      <div className='font-sans'><b>{amount}</b></div>
      <div className='font-sans'>{sales}</div>
    </div>
  );
}
