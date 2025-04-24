import React from "react";
import { z } from "zod";
import { useReactTable, getCoreRowModel, createColumnHelper, type TableOptions } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { faker } from "@faker-js/faker";

// Define Zod schema
const ZodSchema = z.object({
  activityCategory: z.string().min(1, "Please select an option"),
  activityName: z.string().min(2, "You must have a length of at least 2"),
  fundsDirection: z.string(),
  fundsAmount: z.string(),
  beginDate: z.string(),
  endDate: z.string(),
  activityNotes: z.string(),
});

type Activity = z.infer<typeof ZodSchema>;

// Generate mock data
const generateFakeData = (): Activity[] => {
  return Array.from({ length: 5 }, () => ({
    activityCategory: faker.helpers.arrayElement([
      "development",
      "investing",
      "reserving",
      "service",
      "utilities",
      "charity",
      "health",
      "travel",
      "food",
      "wants",
      "clothes",
      "education",
      "household"
    ]),
    activityName: faker.lorem.words({ min: 1, max: 3 }),
    fundsDirection: faker.helpers.arrayElement(["inbound", "outbound"]),
    fundsAmount: faker.finance.amount({ min: 100, max: 10000, dec: 2 }),
    beginDate: faker.date.past().toISOString().slice(11, 16),
    endDate: faker.date.future().toISOString().slice(11, 16),
    activityNotes: faker.lorem.sentence(),
  }));
};

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
  const data = React.useMemo(() => generateFakeData(), []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<Activity>);

  return (
    <div className="w-full space-y-4">
      {table.getRowModel().rows.map((row) => {
        console.log(row.getVisibleCells())
        return (
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
      })}
    </div>
  );
}
