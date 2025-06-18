'use client'

import { Percent, Receipt, ReceiptText } from "lucide-react"

ReceiptText

type CouponItem = {
    name: string
    progress: number
    total: number
}

type Props = {
    title: string
    items: CouponItem[]
}

export default function CouponCardList({ title, items }: Props) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold">{title}</h2>
                <button className="text-blue-800 text-xs">View All</button>
            </div>

            {items.map((item, index) => {
                const percentage = (item.progress / item.total) * 100

                return (
                    <div key={index} className="flex items-start space-x-3 mb-6">
                        {/* Icon */}
                        <div className="p-3 rounded-xl bg-blue-100">
                            <ReceiptText size={18} className="text-blue-900" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <p className="font-medium text-sm text-black">{item.name}</p>

                            {/* Progress bar wrapper */}
                            <div className="relative h-2 w-full mt-1">
                                {/* Background dashed tail */}
                                <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full">
                                    <div className="h-full w-full bg-[radial-gradient(circle,_rgba(0,0,0,0.05)_1px,_transparent_1px)] [background-size:10px_10px] rounded-full"></div>
                                </div>

                                {/* Blue fill */}
                                <div
                                    className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-900 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                />

                                {/* Thumb */}
                                <div
                                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-blue-900 rounded-full"
                                    style={{ left: `${percentage}%` }}
                                />
                            </div>

                            {/* Text below progress */}
                            <p className="text-sm text-gray-600 mt-1">
                                Couple Redeemed: {item.progress} / {item.total}
                            </p>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}
