import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ActivityForm, ActivityList } from "@/modules/activities";
import type { Activity } from "@/modules/activities/types";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/_auth/")({
    component: Daily,
});

function Daily() {
    const date = new Date().toLocaleDateString("en-CA"); // Returns YYYY-MM-DD format

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Activity | null>(null);
    const [selectedDay, setSelectedDay] = useState(date);

    const handleEditItem = (item: Activity) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const handleDayPick = (day: string) => {
        setSelectedDay(day);
    };

    const handleCloseForm = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between mb-2">
                <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex">
                        <Input
                            id="daypicker"
                            name="daypicker"
                            type="date"
                            value={selectedDay}
                            onChange={(e) => handleDayPick(e.target.value)}
                            className="w-fit mr-2"
                        />
                        <SheetTrigger asChild className="grow">
                            <Button onClick={() => setSelectedItem(null)}>
                                Add Activity
                            </Button>
                        </SheetTrigger>
                    </div>
                    <SheetContent className="flex flex-col">
                        <SheetHeader>
                            <SheetTitle>Add Activity</SheetTitle>
                            <SheetDescription>
                                Add your activity info here. Click save when
                                you're done.
                            </SheetDescription>
                        </SheetHeader>
                        <ActivityForm
                            defaultValues={selectedItem || undefined}
                            onClose={handleCloseForm}
                            selectedDay={selectedDay}
                        />
                    </SheetContent>
                </Sheet>
            </div>
            <ActivityList onEdit={handleEditItem} selectedDay={selectedDay} />
        </div>
    );
}
