
import { useReactTable, getCoreRowModel, createColumnHelper, type TableOptions } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { useActivities } from "../hooks/useActivities";
import type { Activity } from "../types";

const columnHelper = createColumnHelper<Activity>();

const columns = [
  // columnHelper.accessor("beginDate", {
  //   header: () => <span>Start</span>,
  //   cell: (info) => info.getValue(),
  // }),
  // columnHelper.accessor("endDate", {
  //   header: () => <span>End</span>,
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("activityCategory", {
    header: () => <span>Category</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("activityName", {
    header: () => <span>Activity</span>,
    cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor("fundsDirection", {
  //   header: () => <span>Direction</span>,
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("fundsAmount", {
    header: () => <span>Amount</span>,
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("activityNotes", {
    header: () => <span>Notes</span>,
    cell: (info) => info.getValue(),
  }),
];

export default function ActivityTable() {
  const { data: activities, isLoading } = useActivities();
  const table = useReactTable({
    data: activities || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<Activity>);

  if (isLoading) "Loading..."

  return (
    <div className="w-full space-y-4">
      {table.getRowModel().rows.map((row) => (
        <Card
          key={row.id}
          className="w-full"
        >
          <CardContent>
            <div className="flex justify-between">
              <div className="text-muted-foreground">{row.original.activityCategory}</div>
              <div className={row.original.fundsDirection === "outbound" ? "text-red-600" : "text-green-600"}>
                {row.original.fundsDirection === "outbound" ? "-$ " : "$ "}
                {row.original.fundsAmount}
              </div>
            </div>
            <div className="font-medium text-xl">{row.original.activityName}</div>
            <div className="flex justify-between items-end">
              <div>{row.original.activityNotes}</div>
              <div>{row.original.beginDate}</div>
            </div>
          </CardContent>
        </Card>
      )
      )}
    </div>
  );
}
