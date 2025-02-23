import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import TopNavBar from '../components/TopNavBar'

export const Route = createRootRoute({
  component: () => (
    <>
      <TopNavBar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})