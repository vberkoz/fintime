import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/categories')({
  component: Categories,
})

function Categories() {
  return (
    <div className="space-y-4">
    </div>
  )
}