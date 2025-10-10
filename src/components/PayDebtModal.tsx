// PayDebtModal.tsx
import React, { useState, useEffect, useRef } from "react"
import type { Debt, Payment } from "@/utils/debtUtils"
import { uid, calculateCurrentAmount } from "@/utils/debtUtils"

interface Props {
  visible: boolean
  onClose: () => void
  debt: Debt
  onSave: (updatedDebt: Debt) => void | Promise<void>
}

export const PayDebtModal: React.FC<Props> = ({ visible, onClose, debt, onSave }) => {
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [processing, setProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (visible) {
      setPaymentAmount("")
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [debt, visible])

  const remaining = calculateCurrentAmount(debt)

  const handlePay = async () => {
    if (processing) return
    const amount = Number(paymentAmount.replace(/,/g, ""))
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount")
    if (amount > remaining) return alert("Payment exceeds remaining debt")

    const payment: Payment = {
      id: uid(),
      date: new Date().toISOString(),
      amount,
    }

    const updatedDebt: Debt = {
      ...debt,
      payments: [...(debt.payments || []), payment],
    }

    try {
      setProcessing(true)
      await onSave(updatedDebt) // parent is responsible for closing the modal
    } catch (err) {
      console.error(err)
      alert("Failed to save payment")
    } finally {
      setProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/,/g, "")
    if (val.startsWith("0") && !val.includes(".")) val = val.slice(1)
    if (val === "") setPaymentAmount("")
    else {
      const numeric = Number(val)
      if (!isNaN(numeric)) setPaymentAmount(numeric.toLocaleString())
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Pay Debt</h3>

        <div className="mb-4 text-sm text-gray-600 space-y-1">
          <div>Original Amount: ₦{debt.amount.toLocaleString()}</div>
          <div>
            Days Elapsed:{" "}
            {Math.max(
              0,
              Math.floor(
                (new Date().getTime() - new Date(debt.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )
            )}{" "}
            days
          </div>
          <div>Current Amount: ₦{remaining.toLocaleString()}</div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={paymentAmount}
          onChange={handleInputChange}
          placeholder="Payment Amount (₦)"
          className="w-full rounded-md border border-gray-200 p-2 mb-4"
          disabled={processing}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border border-gray-300" disabled={processing}>
            Cancel
          </button>
          <button onClick={handlePay} className="px-4 py-2 rounded bg-emerald-600 text-white" disabled={processing}>
            {processing ? "Processing..." : "Pay"}
          </button>
        </div>
      </div>
    </div>
  )
}
