import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "react-datepicker"
import { useForm, type AnyFieldApi } from "@tanstack/react-form"
import { z } from "zod"
import "react-datepicker/dist/react-datepicker.css";

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

const ZodSchema = z.object({
  eventCategory: z.string().min(2, 'You must have a length of at least 2'),
  eventName: z.string().min(2, 'You must have a length of at least 2'),
  fundsDirection: z.boolean(),
  fundsAmount: z.number(),
  beginDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  eventNotes: z.string(),
})

export const EventForm = () => {
  const form = useForm({
    defaultValues: {
      eventCategory: '',
      eventName: '',
      fundsDirection: false,
      fundsAmount: 0,
      beginDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      eventNotes: '',
    },
    validators: {
      onChange: ZodSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
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
      <div>
        <form.Field
          name="eventCategory"
          children={(field) => {
            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Category</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </div>
            )
          }}
        />
      </div>
      <div>
        <form.Field
          name="eventName"
          children={(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Name:</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </div>
      <div>
        <form.Field
          name="fundsDirection"
          children={(field) => (
            <div className="flex space-x-2">
              <Checkbox
                onCheckedChange={(checked) => field.handleChange(!!checked)}
                checked={field.state.value}
                onBlur={field.handleBlur}
                id={field.name}
              />
              <Label htmlFor={field.name} className="mt-0.5">Funds direction income</Label>
            </div>
          )}
        />
      </div>
      <div>
        <form.Field
          name="fundsAmount"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Funds Amount:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="beginDate"
          children={(field) => (
            <div className="space-y-2">
              <Label>Event Start</Label>
              <DatePicker
                selected={field.state.value ? new Date(field.state.value) : undefined}
                onChange={(date) => {
                  if (date) field.handleChange(date.toISOString())
                }}
                showTimeSelect
                dateFormat="Pp"
                popperPlacement="bottom-start"
                portalId="datepicker-portal"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
      </div>
      <div>
        <form.Field
          name="endDate"
          children={(field) => (
            <>
              <label htmlFor={field.name}>End Date:</label>
              <input
                type="datetime-local"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="eventNotes"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Event Notes:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </button>
        )}
      />
    </form>
  )
}