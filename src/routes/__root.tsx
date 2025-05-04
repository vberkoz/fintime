import TopNavBar from '@/components/TopNavBar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <main className='p-2 overflow-y-scroll min-h-screen'>
      <TopNavBar />
      <Outlet />
    </main>
  ),
})