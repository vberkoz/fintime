import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/settings')({
  component: Settings,
})

function Settings() {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Settings</h3>
    </div>
  )
}