import { createFileRoute } from '@tanstack/react-router'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute('/')({
  component: Index,
})

const cards = [
  { title: "Income", valueCaption1: "Total", value1: "$5,000", valueCaption2: "Goal", value2: "$6,000" },
  { title: "Expenses", valueCaption1: "Total", value1: "$3,000", valueCaption2: "Remaining", value2: "$1,000" },
  { title: "Time Usage", valueCaption1: "Work", value1: "40h", valueCaption2: "Leisure", value2: "10h" },
  { title: "Net Worth", valueCaption1: "Savings", value1: "$2,000", valueCaption2: "from last month", value2: "+5%" },
];

const incomeData = [
  { name: "Salary", value: 4000, category: "Income" },
  { name: "Freelance", value: 1000, category: "Income" },
];

const expensesData = [
  { name: "Rent", value: 1200, category: "Expenses" },
  { name: "Groceries", value: 500, category: "Expenses" },
];

const timeUsageData = [
  { name: "Work", value: 40, color: "#8884d8" },
  { name: "Study", value: 10, color: "#82ca9d" },
  { name: "Leisure", value: 10, color: "#ffc658" },
];

const recentAcivities = [
  { date: "10/15/2023", amount: 1000, category: "Freelance" },
  { date: "10/14/2023", amount: -50, category: "Groceries" },
  { date: "10/13/2023", amount: 4000, category: "Salary" },
  { date: "10/12/2023", amount: -100, category: "Entertainment" },
]

const upcomingDeadlines = [
  { date: "10/20/2023", description: "Pay Rent", status: "Pending" },
  { date: "10/25/2023", description: "Submit Report", status: "In Progress" },
]

function Index() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-3xl text-zinc-800 leading-8 mb-4">Dashboard</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => 
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
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
          <h2 className="text-lg mb-2">Income</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={incomeData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" stackId="a" fill="#8884d8" name="Income" />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-sm text-zinc-800">
            {incomeData.map((row) => <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
              <div>{row.name}</div>
              <div>${row.value}</div>
            </div>)}
          </div>
        </div>
        
        <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
          <h2 className="text-lg mb-2">Expenses</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={expensesData}
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
            {expensesData.map((row) => <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
              <div>{row.name}</div>
              <div>${row.value}</div>
            </div>)}
          </div>
        </div>

        <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
          <h2 className="text-lg mb-2">Time Usage Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={timeUsageData}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {timeUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-sm text-zinc-800">
            {timeUsageData.map((row) => <div className="grid grid-cols-2 border-b border-zinc-200 p-2">
              <div>{row.name}</div>
              <div>{row.value}h</div>
            </div>)}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
          <h2 className="text-lg mb-2">Recent Acivities</h2>
          <div className="text-sm text-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-200 p-2 font-bold">
              <div>Date</div>
              <div>Amount</div>
              <div>Category</div>
            </div>
            {recentAcivities.map((row) => <div className="grid grid-cols-3 border-b border-zinc-200 p-2">
              <div>{row.date}</div>
              <div>{row.amount > 0 ? `+$${row.amount}` : `-$${row.amount * -1}`}</div>
              <div>{row.category}</div>
            </div>)}
          </div>
        </div>

        <div className="bg-zinc-100 p-4 w-full flex flex-col justify-between">
          <h2 className="text-lg mb-2">Upcoming Deadlines</h2>
          <div className="text-sm text-zinc-800">
            <div className="grid grid-cols-3 border-b border-zinc-200 p-2 font-bold">
              <div>Date</div>
              <div>Description</div>
              <div>Status</div>
            </div>
            {upcomingDeadlines.map((row) => <div className="grid grid-cols-3 border-b border-zinc-200 p-2">
              <div>{row.date}</div>
              <div>{row.description}</div>
              <div>{row.status}</div>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
