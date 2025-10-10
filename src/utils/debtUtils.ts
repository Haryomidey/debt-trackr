export interface Payment {
    id: string
    date: string
    amount: number
}

export interface Debt {
    id: string
    lenderName: string
    amount: number
    dailyInterest: number
    startDate: string
    notes?: string
    payments?: Payment[]
}

export const uid = (): string => Math.random().toString(36).slice(2, 9)

export const calculateDailyIncrease = (amount: number, dailyInterest: number): number => {
    return (amount * dailyInterest) / 100
}

export const calculateFutureAmount = (amount: number, dailyInterest: number, days: number): number => {
    return amount * Math.pow(1 + dailyInterest / 100, days)
}

export const daysBetween = (fromDate: string | Date, toDate: string | Date): number => {
    const msPerDay = 1000 * 60 * 60 * 24
    const f = new Date(fromDate).setHours(0, 0, 0, 0)
    const t = new Date(toDate).setHours(0, 0, 0, 0)
    return Math.round((t - f) / msPerDay)
}

export const calculateCurrentAmount = (debt: Debt): number => {
    const today = new Date()
    const daysElapsed = daysBetween(debt.startDate, today)
    const baseAmount = calculateFutureAmount(debt.amount, debt.dailyInterest, daysElapsed)
    const totalPaid = debt.payments?.reduce((sum, p) => sum + p.amount, 0) || 0
    return Math.max(baseAmount - totalPaid, 0)
}

export const addPayment = (debt: Debt, paymentAmount: number, paymentDate: string = new Date().toISOString()) => {
    const payment = { id: uid(), amount: paymentAmount, date: paymentDate }
    const updatedDebt: Debt = {
        ...debt,
        payments: debt.payments ? [...debt.payments, payment] : [payment]
    }
    return updatedDebt
};