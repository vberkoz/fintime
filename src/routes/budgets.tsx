import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/budgets')({
  component: Budgets,
})

function Budgets() {
  return <div className="p-2">Budgets</div>
}