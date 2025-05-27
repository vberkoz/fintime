import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/billing')({
  component: Billing,
})

function Billing() {
  return (
    <div className="p-2">
      Billing
    </div>
  )
}