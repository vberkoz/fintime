import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/profile')({
  component: Profile,
})

function Profile() {
  return (
    <div className="space-y-4">
    </div>
  )
}