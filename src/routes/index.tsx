import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ActivityForm } from '@/features/activity/components/ActivityForm';
import ActivityList from '@/features/activity/components/ActivityList';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function closeDialog(): void {
    setIsDialogOpen(false);
  }

  return (
    <div>
      <div className="flex justify-between space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Today's Activities</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Activity</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Activity</DialogTitle>
              <DialogDescription>
                Add your activity info here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ActivityForm closeDialog={closeDialog} />
          </DialogContent>
        </Dialog>
      </div>
      <ActivityList />
    </div>
  )
}
