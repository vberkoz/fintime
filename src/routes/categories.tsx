import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/categories')({
  component: Categories,
})

function Categories() {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Categories</h3>
    </div>
  )
}