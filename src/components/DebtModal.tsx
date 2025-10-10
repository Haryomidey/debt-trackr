import React, { useState, useEffect, useMemo } from "react"
import { uid, calculateFutureAmount, daysBetween } from "@/utils/debtUtils"
import type { Debt } from "@/utils/debtUtils"

interface Props {
    visible: boolean
    onClose: () => void
    onSave: (debt: Debt) => void
    debt?: Debt
}

export const DebtModal: React.FC<Props> = ({ visible, onClose, onSave, debt }) => {
    const [lenderName, setLenderName] = useState("")
    const [amount, setAmount] = useState<number | undefined>(undefined)
    const [dailyInterest, setDailyInterest] = useState(1)
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))
    const [currentAmount, setCurrentAmount] = useState<number | undefined>(undefined)
    const [notes, setNotes] = useState("")

    useEffect(() => {
        if (debt) {
            setLenderName(debt.lenderName)
            setAmount(debt.amount)
            setDailyInterest(debt.dailyInterest)
            setStartDate(debt.startDate)
            setNotes(debt.notes || "")
            setCurrentAmount(undefined)
        } else {
            setLenderName("")
            setAmount(undefined)
            setDailyInterest(1)
            setStartDate(new Date().toISOString().slice(0, 10))
            setNotes("")
            setCurrentAmount(undefined)
        }
    }, [debt])

    const daysElapsed = useMemo(() => daysBetween(startDate, new Date()), [startDate])

    useEffect(() => {
        if (amount && currentAmount && daysElapsed > 0) {
            const inferred = ((currentAmount / amount) ** (1 / daysElapsed) - 1) * 100
            if (isFinite(inferred)) setDailyInterest(Number(inferred.toFixed(2)))
        }
    }, [amount, currentAmount, daysElapsed])

    const projectedAmount = useMemo(() => {
        if (!amount || amount <= 0) return 0
        return calculateFutureAmount(amount, dailyInterest, daysElapsed)
    }, [amount, dailyInterest, daysElapsed])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!lenderName || !amount || amount <= 0)
            return alert("Please provide lender name and an amount > 0")
        const newDebt: Debt = debt
            ? { ...debt, lenderName, amount, dailyInterest, startDate, notes }
            : { id: uid(), lenderName, amount, dailyInterest, startDate, notes }
        onSave(newDebt)
        onClose()
    }

    if (!visible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4 overflow-y-scroll h-[90%] scrollbar-none">
                <h3 className="text-xl font-semibold text-gray-800">{debt ? "Edit Debt" : "Add New Debt"}</h3>
                <form onSubmit={submit} className="space-y-4 text-xs">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Lender / Source</label>
                        <input
                            value={lenderName}
                            onChange={(e) => setLenderName(e.target.value)}
                            placeholder="e.g., LoanApp Co."
                            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">Who you borrowed from</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Principal Amount (₦)</label>
                        <input
                            value={amount === undefined ? "" : amount}
                            onChange={(e) => {
                                const val = e.target.value ? Number(e.target.value) : undefined
                                setAmount(val)
                            }}
                            type="number"
                            min={0}
                            placeholder="e.g., 100000"
                            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">Original amount borrowed</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Current Amount (₦, optional)</label>
                        <input
                            value={currentAmount === undefined ? "" : currentAmount}
                            onChange={(e) => {
                                const val = e.target.value ? Number(e.target.value) : undefined
                                setCurrentAmount(val)
                            }}
                            type="number"
                            min={0}
                            placeholder="e.g., 170000"
                            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Enter this if you know how much it has grown. Daily interest will be auto-calculated
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Daily Interest (%)</label>
                        <input
                            value={dailyInterest}
                            onChange={(e) => setDailyInterest(Number(e.target.value))}
                            type="number"
                            step="0.01"
                            placeholder="1.2"
                            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">Daily percentage interest</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                        <p className="text-xs text-gray-400 mt-1">Date when the debt was taken</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
                        <input
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g., Short-term loan"
                            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 space-y-1 text-xs">
                        <div>Original Amount: ₦{amount ? amount.toLocaleString() : "--"}</div>
                        <div>Days Elapsed: {daysElapsed} days</div>
                        <div>Daily Interest: {dailyInterest.toFixed(2)}%</div>
                        <div>
                            Estimated Current Amount: ₦
                            {projectedAmount ? projectedAmount.toLocaleString() : "--"}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:opacity-90 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};