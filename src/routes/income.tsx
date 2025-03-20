import { createFileRoute } from '@tanstack/react-router'
import { IncomeList } from '../features/income/components/IncomeList'

export const Route = createFileRoute('/income')({
  component: Income,
})

function Income() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Income</h3>
      <IncomeList />
    </div>
  )
}