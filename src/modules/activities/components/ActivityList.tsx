import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    type TableOptions,
} from "@tanstack/react-table";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { useActivities } from "../hooks/useActivities";
import type { Activity } from "../types";
import { Button } from "@/components/ui/button";
import { Clock, Loader2, Pencil, Trash2 } from "lucide-react";
import { useRemoveActivity } from "../hooks/useRemoveActivity";
import { calculateDuration } from "@/lib/calculateDuration";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { NotesExpandButton } from "@/components/NotesExpandButton";

interface ActivityListProps {
    onEdit: (item: Activity) => void;
    selectedDay: string;
}

const columnHelper = createColumnHelper<Activity>();

const columns = [
    columnHelper.accessor("activityCategory", {
        header: () => <span>Category</span>,
    }),
    columnHelper.accessor("activityName", {
        header: () => <span>Activity</span>,
    }),
    columnHelper.accessor("fundsAmount", {
        header: () => <span>Amount</span>,
    }),
    columnHelper.accessor("activityNotes", {
        header: () => <span>Notes</span>,
    }),
];

export function ActivityList({ onEdit, selectedDay }: ActivityListProps) {
    const { data: activities, isLoading } = useActivities(selectedDay);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
        {}
    );

    const toggleExpanded = (id: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const table = useReactTable({
        data: activities || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    } as TableOptions<Activity>);

    const removeActivity = useRemoveActivity();

    const onRemove = async (endDate: string, activityId: string) => {
        await removeActivity.mutateAsync({ endDate, activityId });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-104px)]">
                <div className="flex flex-col items-center justify-center">
                    <span className="flex text-left font-semibold items-center">
                        Please wait
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </span>
                </div>
            </div>
        );
    }

    if (!activities || activities.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-104px)]">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-center text-muted-foreground">
                        No activities for this day
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4 max-w-5xl mx-auto">
            {table.getRowModel().rows.map((row) => {
                const isExpanded = expandedItems[row.id] || false;
                const startTime = new Date(
                    row.original.beginDate
                ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                const endTime = new Date(
                    row.original.endDate
                ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                const duration = calculateDuration(
                    row.original.beginDate,
                    row.original.endDate
                );
                const notes = row.original.activityNotes;

                return (
                    <Card
                        key={row.id}
                        className="w-full py-2 mb-4 overflow-hidden transition-all hover:shadow-md gap-0"
                    >
                        <CardHeader className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="w-fit text-xs font-medium"
                                >
                                    {row.original.activityCategory}
                                </Badge>
                                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                                    {row.original.activityName}
                                </h3>
                            </div>
                            <div className="text-right">
                                {row.original.fundsAmount && (
                                    <p
                                        className={`text-sm font-semibold ${row.original.fundsDirection === "expense" ? "text-red-600" : "text-green-600"}`}
                                    >
                                        {row.original.fundsDirection ===
                                        "expense"
                                            ? "-"
                                            : "+"}
                                        {row.original.fundsAmount}
                                    </p>
                                )}
                            </div>
                        </CardHeader>

                        {notes && (
                            <CardContent className="px-4 pb-4">
                                <div
                                    id={`notes-${row.id}`}
                                    className={`text-sm text-muted-foreground whitespace-pre-wrap ${isExpanded ? "" : "line-clamp-2 sm:line-clamp-3"}`}
                                >
                                    {notes}
                                </div>
                                <NotesExpandButton
                                    text={notes}
                                    rowId={row.id}
                                    isExpanded={isExpanded}
                                    onToggle={() => toggleExpanded(row.id)}
                                />
                            </CardContent>
                        )}

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
                                    onClick={() =>
                                        onEdit({
                                            activityCategory:
                                                row.original.activityCategory,
                                            activityName:
                                                row.original.activityName,
                                            fundsDirection:
                                                row.original.fundsDirection,
                                            fundsAmount:
                                                row.original.fundsAmount,
                                            beginDate: row.original.beginDate,
                                            endDate: row.original.endDate,
                                            activityNotes:
                                                row.original.activityNotes,
                                            activityId: row.original.activityId,
                                        })
                                    }
                                >
                                    <Pencil className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        onRemove(
                                            row.original.endDate,
                                            row.original.activityId
                                        )
                                    }
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
