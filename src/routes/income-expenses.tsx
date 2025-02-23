import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/income-expenses')({
  component: IncomeExpenses,
})

function IncomeExpenses() {
  return <div className="p-2">Income & Expenses</div>
}