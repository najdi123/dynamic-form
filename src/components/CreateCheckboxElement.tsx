import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Element } from "../types/form";

type Props = {
  setIsCreating: React.Dispatch<
    React.SetStateAction<"text" | "checkbox" | null>
  >;
  handleAddElement: (element: Element) => void;
};

type CreateCheckboxFormData = {
  label: string;
  isRequired?: boolean;
  choices: {
    name: string;
  }[];
};

const checkboxSchema = yup.object({
  label: yup.string().required("Label is required"),
  isRequired: yup.boolean().optional(),
  choices: yup
    .array(
      yup.object({
        name: yup.string().required("Choice name is required"),
      })
    )
    .min(1, "At least one choice is required")
    .required(),
});

export default function CreateCheckboxElement({
  setIsCreating,
  handleAddElement,
}: Props) {
  // 1) We tell react-hook-form our form data matches `Element`
  //    which already has an optional `choices?: Choice[]`
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCheckboxFormData>({
    resolver: yupResolver(checkboxSchema),
    defaultValues: {
      label: "",
      isRequired: false,
      // Start with exactly one default choice (empty)
      choices: [
        {
          // We can create a temp ID here, or leave it blank until onSubmit
          name: "",
        },
      ],
    },
  });

  // 3) Use useFieldArray to manage `choices` (the array in `Element`)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "choices", // <— the key in `defaultValues`
  });
  const onError = (errors: unknown) => {
    console.log("Validation failed. Errors:", errors);
  };

  // 4) Handle form submission
  const onSubmit = (data: CreateCheckboxFormData) => {
    // We can generate an ID for the Element now (or use a library like uuid).
    const finalId = `${Date.now()}`;

    // Also, ensure each choice has a valid ID. This is optional—
    // you can create IDs on append() if you prefer.
    const finalChoices =
      data.choices?.map((choice, index) => ({
        ...choice,
        id: `${finalId}-choice-${index}`,
      })) ?? [];

    // 5) Now create the final `Element` object
    const newElement: Element = {
      id: finalId,
      type: "checkbox",
      label: data.label,
      isRequired: data.isRequired,
      choices: finalChoices,
    };

    handleAddElement(newElement);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* Label */}
      <div>
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Checkbox Label"
              error={!!errors.label}
              helperText={errors.label?.message}
            />
          )}
        />
      </div>

      {/* Required? */}
      <div style={{ marginTop: "8px" }}>
        <Controller
          name="isRequired"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Required"
            />
          )}
        />
      </div>

      {/* Choices */}
      <div style={{ margin: "16px 0" }}>
        <h4>Choices</h4>
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: "flex", marginBottom: 8 }}>
            {/* Tie to the `name` field of each Choice */}
            <Controller
              name={`choices.${index}.name` as const}
              control={control}
              rules={{ required: "Choice name is required" }}
              render={({ field: rhfField }) => (
                <TextField
                  {...rhfField}
                  label={`Choice #${index + 1}`}
                  size="small"
                  error={!!errors.choices?.[index]?.name}
                  helperText={errors.choices?.[index]?.name?.message}
                />
              )}
            />

            {/* Remove choice button if more than 1 choice */}
            {fields.length > 1 && (
              <Button
                type="button"
                style={{ marginLeft: 8 }}
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <Button type="button" onClick={() => append({ name: "" })}>
          + Add Another Choice
        </Button>
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Button onClick={() => setIsCreating(null)} style={{ marginLeft: 8 }}>
        Cancel
      </Button>
    </form>
  );
}
