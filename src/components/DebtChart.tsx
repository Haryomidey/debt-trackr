import React, { useMemo } from "react"
import { Bar, Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js"
import type { Debt } from "@/utils/debtUtils"
import { calculateFutureAmount, daysBetween } from "@/utils/debtUtils"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

interface Props {
    debts: Debt[]
}

export const DebtChart: React.FC<Props> = ({ debts }) => {
    const labels = useMemo(() => debts.map((d) => d.lenderName), [debts])

    const currentAmounts = useMemo(() => {
        return debts.map((d) => {
            const daysElapsed = daysBetween(d.startDate, new Date())
            return calculateFutureAmount(d.amount, d.dailyInterest, daysElapsed)
        })
    }, [debts])

    const totalAmount = useMemo(() => currentAmounts.reduce((s, v) => s + v, 0), [currentAmounts])

    const barData = {
        labels,
        datasets: [
            {
                label: "Current Amount (₦)",
                data: currentAmounts,
                backgroundColor: "rgba(34,197,94,0.7)",
                borderColor: "rgba(34,197,94,1)",
                borderWidth: 1,
            },
        ],
    }

    const pieData = {
        labels,
        datasets: [
            {
                label: "Debt Distribution",
                data: currentAmounts,
                backgroundColor: debts.map(
                    (_, i) => `hsl(${(i * 60) % 360}, 70%, 50%)`
                ),
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const val = tooltipItem.raw ?? tooltipItem.parsed
                        return `₦${Number(val).toLocaleString()}`
                    },
                },
            },
        },
        maintainAspectRatio: false,
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-4 rounded-2xl shadow border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Debt Overview (Bar)</h3>
                <div className="h-64">
                    <Bar data={barData} options={options} />
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Debt Distribution (Pie)</h3>
                <div className="h-64">
                    <Pie data={pieData} options={options} />
                </div>
                <div className="mt-2 text-sm text-gray-500">
                    Total debt: <span className="font-semibold">₦{totalAmount.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
};