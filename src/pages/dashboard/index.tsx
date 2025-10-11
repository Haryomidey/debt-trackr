import React, { useState } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { uid } from "@/utils/debtUtils"
import type { Debt } from "@/utils/debtUtils"
import { DebtCard } from "@/components/DebtCard"
import { TotalOverview } from "@/components/TotalOverview"
import { ProjectionCalculator } from "@/components/ProjectionCalculator"
import { DebtModal } from "@/components/DebtModal"
import { FaRegFolderOpen } from "react-icons/fa6"
import { DebtChart } from "@/components/DebtChart"
import { QuickTips } from "@/components/QuickTips"

const Dashboard: React.FC = () => {
    const [debts, setDebts] = useLocalStorage<Debt[]>("debttrackr.debts.v2", [
        {
            id: uid(),
            lenderName: "LoanApp A",
            amount: 500_000,
            dailyInterest: 0.5,
            startDate: new Date(new Date().setDate(new Date().getDate() - 10))
                .toISOString()
                .slice(0, 10),
            notes: "Short-term loan",
            payments: [],
        },
        {
            id: uid(),
            lenderName: "Friend - Tunde",
            amount: 200_000,
            dailyInterest: 0.1,
            startDate: new Date(new Date().setDate(new Date().getDate() - 30))
                .toISOString()
                .slice(0, 10),
            notes: "Personal",
            payments: [],
        },
    ])

    const [modalVisible, setModalVisible] = useState(false)
    const [editingDebt, setEditingDebt] = useState<Debt | null>(null)

    const addOrUpdateDebt = (d: Debt) => {
        setDebts((prev) => {
            const exists = prev.find((x) => x.id === d.id)
            if (exists) return prev.map((x) => (x.id === d.id ? d : x))
            return [d, ...prev]
        })
    }

    const deleteDebt = (id: string) => {
        if (!confirm("Delete this debt entry?")) return
        setDebts((prev) => prev.filter((d) => d.id !== id))
    }

    const openEditModal = (debt: Debt) => {
        setEditingDebt(debt)
        setModalVisible(true)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center gap-4 mb-6">
                    <div className="p-2 bg-emerald-600 rounded text-white font-bold">DT</div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">DebtTrackr</h1>
                        <p className="text-sm text-gray-500">
                            Visualize and project your debts to stay in control.
                        </p>
                    </div>
                    <div className="ml-auto text-right">
                        <div className="text-xs text-gray-500">Total principal</div>
                        <div className="text-lg font-semibold">
                            ₦{debts.reduce((s, d) => s + d.amount, 0).toLocaleString()}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-4">
                        <TotalOverview debts={debts} />

                        <div className="grid grid-cols-1 gap-4">
                            {debts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow border border-gray-100 text-center space-y-3">
                                    <FaRegFolderOpen className="text-4xl text-emerald-500 mx-auto" />
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        No debts yet
                                    </h3>
                                    <p className="text-gray-500 max-w-xs">
                                        Looks like you haven't added any debts. Track your loans,
                                        personal borrowing, or credits here to stay on top of your
                                        finances.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setEditingDebt(null)
                                            setModalVisible(true)
                                        }}
                                        className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:opacity-95"
                                    >
                                        Add your first debt
                                    </button>
                                </div>
                            ) : (
                                debts.map((d) => (
                                    <DebtCard
                                        key={d.id}
                                        debt={d}
                                        onDelete={deleteDebt}
                                        onEdit={openEditModal}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                setEditingDebt(null)
                                setModalVisible(true)
                            }}
                            className="w-full px-4 py-2 rounded bg-emerald-600 text-white font-semibold hover:opacity-95"
                        >
                            Add Debt
                        </button>

                        <ProjectionCalculator debts={debts} />

                        <QuickTips />
                    </div>
                </div>

                <DebtChart debts={debts} />

                <DebtModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSave={addOrUpdateDebt}
                    debt={editingDebt ?? undefined}
                />

            </div>
        </div>
    )
}

export default Dashboard;