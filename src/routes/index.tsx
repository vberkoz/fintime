import { createFileRoute } from '@tanstack/react-router';
import { EventList } from '../features/event/components/EventList';
// import { Cards, Expenses, Incomes, Activities, TimeCategories, Deadlines } from '../features/dashboard';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Events</h3>
      <EventList />

      {/* <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Dashboard</h3>
      <Cards />
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Incomes />
        <Expenses />
        <TimeCategories />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Activities />
        <Deadlines />
      </div> */}
    </div>
  )
}
