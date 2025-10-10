import React from "react"
import { calculateDailyIncrease } from "@/utils/debtUtils";
import type { Debt } from '@/utils/debtUtils';

export const TotalOverview: React.FC<{ debts: Debt[] }> = ({ debts }) => {
    const total = debts.reduce((s, d) => s + d.amount, 0)
    const todayIncrease = debts.reduce((s, d) => s + calculateDailyIncrease(d.amount, d.dailyInterest), 0)

    return (
        <div className="bg-white shadow rounded-lg p-4 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Owed</h3>
            <div className="flex items-baseline gap-4 mt-2">
                <div>
                    <div className="text-3xl font-bold text-gray-800">₦{total.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Current principal across all debts</div>
                </div>
                <div className="ml-auto text-right">
                    <div className="text-sm text-gray-500">Daily Interest Accruing</div>
                    <div className="text-lg font-semibold text-emerald-600">₦{todayIncrease.toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
};