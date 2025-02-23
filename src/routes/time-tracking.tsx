import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/time-tracking')({
  component: TimeTracking,
})

function TimeTracking() {
  return <div className="p-2">Time Tracking</div>
}