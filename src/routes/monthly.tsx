import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/monthly')({
  component: Monthly,
})

function Monthly() {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Monthly</h3>
      <Input type="month" className="w-fit mr-2" />
    </div>
  )
}