import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ActivityForm, ActivityList } from "@/modules/activities";
import type { Activity } from "@/modules/activities/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
    component: Daily,
});

function Daily() {
    const date = new Date().toLocaleDateString('en-CA'); // Returns YYYY-MM-DD format
    
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
            <div className="flex flex-col sm:flex-row justify-between space-y-4 mb-4">
                <h2 className="text-2xl font-semibold">Daily Activities</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="flex">
                        <Input
                            id="daypicker"
                            name="daypicker"
                            type="date"
                            value={selectedDay}
                            onChange={(e) => handleDayPick(e.target.value)}
                            className="w-fit mr-2"
                        />
                        <DialogTrigger asChild>
                            <Button onClick={() => setSelectedItem(null)}>Add Activity</Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Activity</DialogTitle>
                            <DialogDescription>
                                Add your activity info here. Click save when
                                you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <ActivityForm
                            defaultValues={selectedItem || undefined}
                            onClose={handleCloseForm}
                            selectedDay={selectedDay}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <ActivityList onEdit={handleEditItem} selectedDay={selectedDay} />
        </div>
    );
}
