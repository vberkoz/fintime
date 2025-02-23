import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports')({
  component: Reports,
})

function Reports() {
  return <div className="p-2">Reports</div>
}