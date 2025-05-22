import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div className="space-y-4">
    </div>
  )
}