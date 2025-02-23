import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/goals')({
  component: Goals,
})

function Goals() {
  return <div className="p-2">Goals</div>
}