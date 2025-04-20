import { createRootRoute, Outlet } from '@tanstack/react-router'
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar'
import { AppSidebar } from '../components/AppSidebar'

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className='p-2'>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  ),
})