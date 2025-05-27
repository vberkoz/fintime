import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/categories')({
  component: Categories,
})

function Categories() {
  return (
    <div className="p-2">
      Categories
    </div>
  )
}