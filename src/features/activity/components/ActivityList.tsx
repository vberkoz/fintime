
import { useReactTable, getCoreRowModel, createColumnHelper, type TableOptions } from "@tanstack/react-table";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useActivities } from "../hooks/useActivities";
import type { Activity } from "../types";
import { Button } from "@/components/ui/button";
import { Clock, Pencil, Trash2 } from "lucide-react";
import { useRemoveActivity } from "../hooks/useRemoveActivity";
import { calculateDuration } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ActivityListProps {
  // items: Item[];
  onEdit: (item: Activity) => void;
  selectedDay: string;
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

export default function ActivityList({ onEdit, selectedDay }: ActivityListProps) {
  const { data: activities, isLoading } = useActivities(selectedDay);

  const table = useReactTable({
    data: activities || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<Activity>);

  const removeActivity = useRemoveActivity();

  const onRemove = async (endDate: string) => {
    await removeActivity.mutateAsync(endDate)
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  // Simplified check for empty activities
  if (!activities || activities.length === 0) {
    return <div className="text-center py-4">No activities for this day</div>;
  }

  return (
    <div className="w-full space-y-4 max-w-5xl mx-auto">
      {table.getRowModel().rows.map((row) => {
        const startTime = new Date(row.original.beginDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const endTime = new Date(row.original.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const duration = calculateDuration(row.original.beginDate, row.original.endDate);
        const notes = row.original.activityNotes || "—";
        
        return (
          <Card key={row.id} className="w-full py-2 mb-4 overflow-hidden transition-all hover:shadow-md gap-0">
            <CardHeader className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Badge variant="outline" className="w-fit text-xs font-medium">
                  {row.original.activityCategory}
                </Badge>
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">{row.original.activityName}</h3>
              </div>
              <div className="text-right">
                {!row.original.fundsAmount ? (
                  <p className="text-sm font-semibold text-zinc-700">$0.00</p>
                ) : (
                  <p className={`text-sm font-semibold ${row.original.fundsDirection === "expense" ? "text-red-600" : "text-green-600"}`}>
                    {row.original.fundsDirection === "expense" ? "-$" : "$"}
                    {row.original.fundsAmount}
                  </p>
                )}
              </div>
            </CardHeader>

            <CardContent className="px-4 pb-4">
              <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                {notes}
              </div>
            </CardContent>

            <Separator />

            <CardFooter className="p-4 flex flex-row items-center justify-between gap-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {startTime} - {endTime}
                </span>
                <span className="mx-2">•</span>
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2 w-auto justify-end">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onEdit({
                    activityCategory: row.original.activityCategory,
                    activityName: row.original.activityName,
                    fundsDirection: row.original.fundsDirection,
                    fundsAmount: row.original.fundsAmount,
                    beginDate: row.original.beginDate,
                    endDate: row.original.endDate,
                    activityNotes: row.original.activityNotes,
                  })}
                >
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onRemove(row.original.endDate)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
