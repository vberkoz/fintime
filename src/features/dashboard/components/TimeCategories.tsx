import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Time from "../../../components/icon/Time";
import { useTimeCategories } from "../hooks/useTimeCategories";

export function TimeCategories() {
  const { data: timeCategories, isLoading } = useTimeCategories();

  if (isLoading) {
    return (
      <div className="bg-zinc-100 p-4 w-full h-[429px] flex flex-col justify-between animate-pulse">
        <div className="h-6 bg-zinc-300 mb-2 w-1/2"></div>
        <div className="text-sm text-zinc-800">
          <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
            <div className="h-5 bg-zinc-200 w-3/4"></div>
            <div className="h-5 bg-zinc-200 w-3/4"></div>
          </div>
          <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
            <div className="h-5 bg-zinc-200 w-3/4"></div>
            <div className="h-5 bg-zinc-200 w-3/4"></div>
          </div>
          <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
            <div className="h-5 bg-zinc-200 w-3/4"></div>
            <div className="h-5 bg-zinc-200 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
      <div className="flex justify-between">
        <h2 className="text-lg mb-2">Time Categories</h2>
        <Time />
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={timeCategories}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {timeCategories?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-sm text-zinc-800">
        {timeCategories?.map((row) => <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
          <div>{row.name}</div>
          <div>{row.value}h</div>
        </div>)}
      </div>
    </div>
  )
}