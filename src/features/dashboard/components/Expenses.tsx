import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ShoppingCart from "../../../components/icon/ShoppingCart";
import { useExpenses } from "../hooks/useExpenses";

export function Expenses() {
  const { data: expenses, isLoading } = useExpenses();

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
        <h2 className="text-lg mb-2">Expenses</h2>
        <ShoppingCart />
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={expenses}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" stackId="b" fill="#ff7373" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-sm text-zinc-800">
        {expenses?.map((row) => <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
          <div>{row.name}</div>
          <div>${row.value}</div>
        </div>)}
      </div>
    </div>
  )
}