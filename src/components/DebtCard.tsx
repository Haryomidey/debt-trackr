import React, { useState } from "react"
import { calculateDailyIncrease, calculateFutureAmount, daysBetween } from "@/utils/debtUtils"
import type { Debt } from "@/utils/debtUtils"
import { Badge } from "./Badge"
import { FaRegClock, FaMoneyBillWave, FaArrowUp, FaCashRegister } from "react-icons/fa"

interface Props {
    debt: Debt
    onDelete: (id: string) => void
    onEdit: (debt: Debt) => void
}

export const DebtCard: React.FC<Props> = ({ debt, onDelete, onEdit }) => {
    const [expanded, setExpanded] = useState(false)

    const today = new Date()
    const daysElapsed = daysBetween(debt.startDate, today)
    const currentAmount = calculateFutureAmount(debt.amount, debt.dailyInterest, daysElapsed)

    const totalPaid = debt.payments?.reduce((s, p) => s + p.amount, 0) || 0
    const remaining = Math.max(currentAmount - totalPaid, 0)
    const dailyInc = calculateDailyIncrease(remaining, debt.dailyInterest)

    const formattedDate = new Date(debt.startDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    })

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6">
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                    <h4 className="text-lg font-bold text-gray-800">{debt.lenderName}</h4>
                    <Badge>
                        +{debt.dailyInterest}% Daily
                    </Badge>
                </div>
                <div className="text-sm text-gray-500">Start: {formattedDate}</div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <StatCard
                        icon={<FaMoneyBillWave className="text-gray-400" />}
                        label="Original"
                        value={`₦${debt.amount.toLocaleString()}`}
                        color="text-gray-800"
                        bg="bg-gray-50"
                    />
                    <StatCard
                        icon={<FaArrowUp className="text-emerald-500" />}
                        label="Current"
                        value={`₦${currentAmount.toFixed(2).toLocaleString()}`}
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    />
                    <StatCard
                        icon={<FaArrowUp className="text-emerald-500" />}
                        label="Daily Increase"
                        value={`₦${dailyInc.toFixed(2)}`}
                        color="text-emerald-600"
                        bg="bg-emerald-50"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StatCard
                        icon={<FaRegClock className="text-blue-400" />}
                        label="Days Elapsed"
                        value={`${daysElapsed}d`}
                        color="text-blue-700"
                        bg="bg-blue-50"
                    />
                    <StatCard
                        icon={<FaCashRegister className="text-rose-500" />}
                        label="Remaining"
                        value={`₦${remaining.toFixed(2).toLocaleString()}`}
                        color="text-rose-600"
                        bg="bg-rose-50"
                    />
                </div>
            </div>

            {expanded && (
                <div className="text-sm text-gray-600 mb-4 border-t border-gray-100 pt-3 space-y-2">
                    <div>
                        <span className="font-medium">Notes:</span> {debt.notes || "—"}
                    </div>

                    {debt.payments && debt.payments.length > 0 && (
                        <div>
                            <div className="font-medium mb-1">Payments:</div>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                {debt.payments.map((p) => (
                                    <li key={p.id}>
                                        {new Date(p.date).toLocaleDateString()}: ₦{p.amount.toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="font-medium mt-3">Projection examples:</div>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {[7, 30, 90, 180, 365].map((d) => (
                            <li key={d}>
                                In {d} days: ₦
                                {calculateFutureAmount(remaining, debt.dailyInterest, d)
                                    .toFixed(2)
                                    .toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex gap-3 mt-3 justify-end text-xs">
                <button
                    onClick={() => setExpanded((s) => !s)}
                    className="px-4 py-2 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition"
                >
                    {expanded ? "Hide" : "Details"}
                </button>
                <button
                    onClick={() => onEdit(debt)}
                    className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(debt.id)}
                    className="px-4 py-2 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

const StatCard = ({
    icon,
    label,
    value,
    color,
    bg,
}: {
    icon: React.ReactNode
    label: string
    value: string
    color: string
    bg: string
}) => (
    <div className={`flex items-center gap-3 ${bg} p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}>
        <div className="text-lg">{icon}</div>
        <div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className={`font-semibold ${color}`}>{value}</div>
        </div>
    </div>
)