import { useDeadlines } from "../hooks/useDeadlines";

export function Deadlines() {
  const { data: deadlines, isLoading } = useDeadlines();

  if (isLoading) {
    return (
      <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between animate-pulse">
        <div className="h-6 bg-zinc-300 mb-2 w-1/2"></div>
        <div className="text-sm text-zinc-800">
          <div className="grid grid-cols-3 border-b border-zinc-200 p-2">
            <div className="h-5 bg-zinc-300 w-3/4"></div>
            <div className="h-5 bg-zinc-300 w-3/4"></div>
            <div className="h-5 bg-zinc-300 w-3/4"></div>
          </div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="grid grid-cols-3 border-b border-zinc-200 p-2">
              <div className="h-5 bg-zinc-200 w-3/4"></div>
              <div className="h-5 bg-zinc-200 w-3/4"></div>
              <div className="h-5 bg-zinc-200 w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
      <h2 className="text-lg mb-2">Upcoming Deadlines</h2>
      <div className="text-sm text-zinc-800">
        <div className="grid grid-cols-3 border-b border-zinc-200 p-2 font-bold">
          <div>Date</div>
          <div>Description</div>
          <div>Status</div>
        </div>
        {deadlines?.map((row) => <div className="grid grid-cols-3 border-b border-zinc-200 p-2">
          <div>{row.date}</div>
          <div>{row.description}</div>
          <div>{row.status}</div>
        </div>)}
      </div>
    </div>
  )
}