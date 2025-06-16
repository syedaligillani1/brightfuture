import React from 'react'


    type CardProps ={

        icon : React.ReactNode
        label : string
        amount : string
        sales : string
    }


export default function Card({icon,label,amount,sales}:CardProps) {


  return (
    <div className= ' space-y-3 bg-white rounded-xl shadow p-6 w-full max-w-xs'>
      <div>{icon}</div>
      <div className="font-sans">{label}</div>
      <div><b>{amount}</b></div>
      <div><i>{sales}</i></div>
    </div>
  )
}
