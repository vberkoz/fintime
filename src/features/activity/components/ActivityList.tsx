
import { useReactTable, getCoreRowModel, createColumnHelper, type TableOptions } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { useActivities } from "../hooks/useActivities";
import type { Activity } from "../types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useRemoveActivity } from "../hooks/useRemoveActivity";

interface ItemListProps {
  // items: Item[];
  onEdit: (item: Activity) => void;
}

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
    // cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("activityName", {
    header: () => <span>Activity</span>,
    // cell: (info) => info.getValue(),
  }),
  // columnHelper.accessor("fundsDirection", {
  //   header: () => <span>Direction</span>,
  //   cell: (info) => info.getValue(),
  // }),
  columnHelper.accessor("fundsAmount", {
    header: () => <span>Amount</span>,
    // cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("activityNotes", {
    header: () => <span>Notes</span>,
    // cell: (info) => info.getValue(),
  }),
];

export default function ActivityList({ onEdit }: ItemListProps) {
  const { data: activities, isLoading } = useActivities();

  const table = useReactTable({
    data: activities || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<Activity>);

  const removeActivity = useRemoveActivity();

  const onRemove = async (endDate: string) => {
    await removeActivity.mutateAsync(endDate)
  }

  if (isLoading) "Loading...";

  return (
    <div className="w-full space-y-4">
      {table.getRowModel().rows.map((row) => (
        <Card key={row.id} className="w-full rounded-md shadow-none px-4 py-2 mb-2">
          <CardContent className="p-0 grid grid-cols-2 md:grid-cols-6 content-center">
            <div className="self-center">{row.original.beginDate}</div>
            <div className="self-center">{row.original.activityCategory}</div>
            <div className="self-center">{row.original.activityName}</div>
            <div className="self-center">{row.original.activityNotes}</div>
            <div className={`${row.original.fundsDirection === "expense" ? "text-red-600" : "text-green-600"} self-center text-right`}>
              {row.original.fundsDirection === "expense" ? "-$ " : "$ "}
              {row.original.fundsAmount}
            </div>
            <div className="text-right self-center">
              <Button disabled variant="ghost" className="h-8 w-8 p-0" onClick={() => onEdit({
                activityCategory: row.original.activityCategory,
                activityName: row.original.activityName,
                fundsDirection: row.original.fundsDirection,
                fundsAmount: row.original.fundsAmount,
                beginDate: row.original.beginDate,
                endDate: row.original.endDate,
                activityNotes: row.original.activityNotes,
              })}>
                <span className="sr-only">Edit</span>
                <Pencil />
              </Button>
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => onRemove(row.original.endDate)}>
                <span className="sr-only">Remove</span>
                <Trash2 />
              </Button>
            </div>
          </CardContent>
        </Card>
      )
      )}
    </div>
  );
}
