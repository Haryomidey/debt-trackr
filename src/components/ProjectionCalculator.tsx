import React, { useMemo, useState } from "react"
import { calculateFutureAmount, daysBetween } from "@/utils/debtUtils"
import type { Debt } from "@/utils/debtUtils"

interface Props {
    debts: Debt[]
}

export const ProjectionCalculator: React.FC<Props> = ({ debts }) => {
    const [days, setDays] = useState<number | undefined>(30)
    const [selectedDebtId, setSelectedDebtId] = useState("all")

    const filteredDebts = useMemo(() => {
        if (selectedDebtId === "all") return debts
        return debts.filter((d) => d.id === selectedDebtId)
    }, [debts, selectedDebtId])

    const totalProjected = useMemo(() => {
        if (!days || days < 0) return 0
        return filteredDebts.reduce((sum, d) => {
            const daysElapsed = daysBetween(d.startDate, new Date())
            const current = calculateFutureAmount(d.amount, d.dailyInterest, daysElapsed)
            return sum + calculateFutureAmount(current, d.dailyInterest, days)
        }, 0)
    }, [filteredDebts, days])

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Projection Calculator</h3>

            <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-3 flex-wrap text-sm">
                <div className="flex-1">
                    <label className="block text-sm text-gray-500 mb-1">Select Debt</label>
                    <select
                        value={selectedDebtId}
                        onChange={(e) => setSelectedDebtId(e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    >
                        <option value="all">All Debts</option>
                        {debts.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.lenderName} - ₦{d.amount.toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-sm text-gray-500 mb-1">Days from now</label>
                    <input
                        type="number"
                        value={days === undefined ? "" : days}
                        min={0}
                        onChange={(e) => {
                            const val = e.target.value ? Number(e.target.value) : undefined
                            setDays(val)
                        }}
                        placeholder="e.g., 30"
                        className="w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>

                <div className="ml-auto text-right min-w-[180px]">
                    <div className="text-xs text-gray-500">Projected total debt</div>
                    <div className="text-2xl font-bold text-emerald-600 truncate">
                        ₦{totalProjected ? totalProjected.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "--"}
                    </div>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Use this tool to estimate how much your {selectedDebtId === "all" ? "combined debts" : "selected debt"} will grow after the selected number of days.
            </div>
        </div>
    )
};