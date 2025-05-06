import { useForm, type AnyFieldApi } from "@tanstack/react-form"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getLocalISOStringWithoutSeconds } from "@/lib/getLocalISOStringWithoutSeconds"
import { ActivitySchema, type Activity } from "../types"
import { useCreateActivity } from "../hooks/useCreateActivity"
import { useActivities } from "../hooks/useActivities"
import { useEffect, useState } from "react"
import { useRemoveActivity } from "../hooks/useRemoveActivity"

const FieldInfo = ({ field }: { field: AnyFieldApi }) => {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const ACTIVITY_CATEGORIES = [
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
  "household",
]

interface ItemFormProps {
  defaultValues?: Activity; // Optional for editing
  onClose: () => void;
  selectedDay: string;
}

export const ActivityForm = ({ defaultValues, onClose, selectedDay }: ItemFormProps) => {
  const createActivity = useCreateActivity();
  const removeActivity = useRemoveActivity();
  const { data: activities } = useActivities(selectedDay);
  const [initialDates, setInitialDates] = useState({
    beginDate: getLocalISOStringWithoutSeconds(selectedDay),
    endDate: getLocalISOStringWithoutSeconds(selectedDay)
  });

  useEffect(() => {
    // Check if we're editing an existing activity
    if (defaultValues) {
      return;
    }

    // Get current date in YYYY-MM-DD format for comparison
    const today = new Date().toISOString().split('T')[0];
    const isToday = selectedDay === today;
    
    // Current datetime for today's activities
    const currentDateTime = getLocalISOStringWithoutSeconds(new Date().toISOString());
    
    // Default values if no activities exist
    let beginDateTime = isToday ? currentDateTime : `${selectedDay}T00:00`;
    let endDateTime = isToday ? currentDateTime : `${selectedDay}T00:00`;
    
    // If activities exist, find the latest one
    if (activities && Array.isArray(activities) && activities.length > 0) {
      // Sort activities by endDate in descending order
      const sortedActivities = [...activities].sort((a, b) => 
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      );
      
      // Get the latest activity's endDate
      const latestEndDate = sortedActivities[0].endDate;
      
      // Set beginDate to the latest activity's endDate
      beginDateTime = latestEndDate;
      
      // For today, set endDate to current time
      // For other days, set endDate to the same as beginDate
      endDateTime = isToday ? currentDateTime : latestEndDate;
    }
    
    setInitialDates({
      beginDate: beginDateTime,
      endDate: endDateTime
    });
  }, [activities, defaultValues, selectedDay]);

  const form = useForm({
    defaultValues: defaultValues || {
      activityCategory: '',
      activityName: '',
      fundsDirection: 'expense',
      fundsAmount: '',
      beginDate: initialDates.beginDate,
      endDate: initialDates.endDate,
      activityNotes: '',
    },
    validators: {
      onSubmit: ActivitySchema,
    },
    onSubmit: async ({ value }) => {
      if (defaultValues && defaultValues.endDate) {
        await removeActivity.mutateAsync(defaultValues.endDate);
      }
      await createActivity.mutateAsync(value);
      form.reset();
      onClose();
    },
  });

  // Reset form when defaultValues change (including when they're cleared)
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({
        activityCategory: '',
        activityName: '',
        fundsDirection: 'expense',
        fundsAmount: '',
        beginDate: getLocalISOStringWithoutSeconds(selectedDay),
        endDate: getLocalISOStringWithoutSeconds(selectedDay),
        activityNotes: '',
      });
    }
  }, [defaultValues, form, selectedDay]);

  // Update form values when initialDates change
  useEffect(() => {
    if (!defaultValues) {
      form.setFieldValue('beginDate', initialDates.beginDate);
      form.setFieldValue('endDate', initialDates.endDate);
    }
  }, [initialDates, form, defaultValues]);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="activityCategory"
        children={(field) => {
          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Category</Label>
              <Select value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                <SelectTrigger id={field.name} className={field.state.meta.errors.length > 0 ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-red-500 text-sm">
                <FieldInfo field={field} />
              </div>
            </div>
          )
        }}
      />

      <form.Field
        name="activityName"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Name:</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={field.state.meta.errors.length > 0 ? "border-red-500" : ""}
            />
            <div className="text-red-500 text-sm">
              <FieldInfo field={field} />
            </div>
          </div>
        )}
      />

      <form.Field
        name="fundsDirection"
        children={(field) => (
          <div className="space-y-2">
            <Label className="font-medium">Funds Direction</Label>
            <RadioGroup
              defaultValue="expense"
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Income</Label>
              </div>
            </RadioGroup>
          </div>
        )}
      />

      <form.Field
        name="fundsAmount"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name} className="font-medium">
              Funds Amount
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type="number"
              step="0.01"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="0.00"
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name="beginDate"
        children={(field) => (
          <div className="space-y-2 w-fit">
            <Label htmlFor={field.name} className="font-medium">
              Begin Date & Time
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type="datetime-local"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={field.state.meta.errors.length > 0 ? "border-red-500" : ""}
            />
            <FieldInfo field={field} />
          </div>
        )
        }
      />
      <form.Field
        name="endDate"
        children={(field) => (
          <div className="space-y-2 w-fit">
            <Label htmlFor={field.name} className="font-medium">
              End Date & Time
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type="datetime-local"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className={field.state.meta.errors.length > 0 ? "border-red-500" : ""}
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <form.Field
        name="activityNotes"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name} className="font-medium">
              Activity Notes
            </Label>
            <Textarea
              id="activityNotes"
              name="activityNotes"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Add any additional details here..."
              rows={3}
            />
            <FieldInfo field={field} />
          </div>
        )}
      />

      <div className="text-right">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={() => (
            <Button type="submit">Save changes</Button>
          )}
        />
      </div>
    </form>
  )
}