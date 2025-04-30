import { useForm, type AnyFieldApi } from "@tanstack/react-form"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getLocalISOStringWithoutSeconds } from "@/lib/utils"
import { ActivitySchema, type Activity } from "../types"
import { useCreateActivity } from "../hooks/useCreateActivity"

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
}

export const ActivityForm = ({ defaultValues, onClose }: ItemFormProps) => {
  const createActivity = useCreateActivity();

  const form = useForm({
    defaultValues: defaultValues || {
      activityCategory: '',
      activityName: '',
      fundsDirection: 'expense',
      fundsAmount: '',
      beginDate: getLocalISOStringWithoutSeconds(),
      endDate: getLocalISOStringWithoutSeconds(),
      activityNotes: '',
    },
    validators: {
      onSubmit: ActivitySchema,
    },
    onSubmit: async ({ value }) => {
      await createActivity.mutateAsync(value)
      onClose();
    },
  })

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