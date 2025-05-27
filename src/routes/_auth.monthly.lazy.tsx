import { Input } from '@/components/ui/input'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/monthly')({
  component: Monthly,
})

function Monthly() {
  return (
    <div className="p-2">
      Monthly
      <Input type="month" className="w-fit mr-2" />
    </div>
  )
}