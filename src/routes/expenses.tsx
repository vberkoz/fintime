import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
  component: Expenses,
})

function Expenses() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Expenses</h3>
    </div>
  )
}