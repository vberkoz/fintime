import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/activities')({
  component: Activities,
})

function Activities() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Activities</h3>
    </div>
  )
}