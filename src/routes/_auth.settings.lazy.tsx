import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div className="p-2">
      Settings
    </div>
  )
}