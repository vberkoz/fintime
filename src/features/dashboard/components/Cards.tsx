import { useCards } from "../hooks/useCards"

export function Cards() {
  const { data: cards, isLoading } = useCards();

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-zinc-100 p-4 w-full">
            <div className="h-6 bg-zinc-300 mb-2 w-1/2"></div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="h-4 bg-zinc-100 mb-1 w-1/3"></div>
                <div className="h-8 bg-zinc-200 w-3/4"></div>
              </div>
              <div>
                <div className="h-4 bg-zinc-100 mb-1 w-1/3"></div>
                <div className="h-8 bg-zinc-200 w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards?.map((card) => 
        <div className="bg-zinc-100 p-4 w-full">
          <h3 className="text-lg mb-2">{card.title}</h3>
          <div className="grid grid-cols-2">
            <div>
              <div className="text-xs text-zinc-600">{card.valueCaption1}</div>
              <div className="text-2xl text-zinc-800">{card.value1}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-600">{card.valueCaption2}</div>
              <div className="text-2xl text-zinc-800">{card.value2}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}